"""Testes do sincronizador do Drive (rodam sem credenciais, com árvore simulada)."""
import importlib.util
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location("sync", ROOT / "tools" / "sincronizar_drive_turmas.py")
sync = importlib.util.module_from_spec(spec)
spec.loader.exec_module(sync)

F = sync.FOLDER_MIME
PDF = "application/pdf"


class CrawlTests(unittest.TestCase):
    def tree(self):
        return {
            "ROOT": [
                {"id": "SUBJ_ANAT_0000001", "name": "ANATOMIA PATOLOGICA I", "mimeType": F},
                {"id": "IGN_HORARIOS_0001", "name": "Horários ônibus UCP", "mimeType": F},
            ],
            "SUBJ_ANAT_0000001": [
                {"id": "PRAT_000000001", "name": "PRÁTICA", "mimeType": F},
            ],
            "PRAT_000000001": [
                {"id": "SLID_P2_0000001", "name": "SLIDES", "mimeType": F},
                {"id": "LAMP_P2_0000001", "name": "LAMINARIO P2", "mimeType": F},
            ],
            "SLID_P2_0000001": [{"id": "PDF_CLASE2_00001", "name": "clase 2.pdf", "mimeType": PDF, "size": "10"}],
            "LAMP_P2_0000001": [
                {"id": "IMG_LAMINA_00001", "name": "Lamina 1.jpg", "mimeType": "image/jpeg", "size": "5"},
                {"id": "bad", "name": "ruim", "mimeType": PDF},
            ],
            "IGN_HORARIOS_0001": [{"id": "HOR_PDF_0000001", "name": "onibus.pdf", "mimeType": PDF}],
        }

    def lister(self, tree):
        def _list(folder_id):
            if folder_id.startswith("FALHA"):
                raise RuntimeError("403")
            return tree.get(folder_id, [])
        return _list

    def test_crawl_keeps_subfolders_and_drops_ignored_root_folders(self):
        items, ok = sync.crawl("ROOT", self.lister(self.tree()), lambda m: None,
                               ignore=["Horários ônibus UCP"])
        ids = {i["id"] for i in items}
        self.assertIn("PDF_CLASE2_00001", ids)
        self.assertIn("IMG_LAMINA_00001", ids)
        self.assertNotIn("HOR_PDF_0000001", ids)
        self.assertTrue(ok)

    def test_practice_slide_gets_subject_and_section(self):
        items, _ = sync.crawl("ROOT", self.lister(self.tree()), lambda m: None,
                              ignore=["Horários ônibus UCP"])
        cat = sync.to_catalog(items, 5, "G")
        slide = next(c for c in cat if c["id"] == "PDF_CLASE2_00001")
        self.assertEqual(slide["s"], "ANATOMIA PATOLOGICA I")
        self.assertEqual(slide["sec"], "PRÁTICA/SLIDES")
        self.assertEqual((slide["p"], slide["c"]), (5, "G"))
        self.assertTrue(all(c["id"] != "bad" for c in cat))

    def test_failed_folder_marks_turma_as_not_ok(self):
        tree = self.tree()
        tree["ROOT"].append({"id": "FALHA_PASTA_00001", "name": "X", "mimeType": F})
        items, ok = sync.crawl("ROOT", self.lister(tree), lambda m: None)
        self.assertFalse(ok)
        self.assertTrue(items)

    def test_fold_ignores_case_and_accents(self):
        self.assertEqual(sync.fold("  Horários  ÔNIBUS UCP "), "horarios onibus ucp")


if __name__ == "__main__":
    unittest.main()
