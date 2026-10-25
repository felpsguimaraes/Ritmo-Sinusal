/* Sinus · Mapas guiados · Anatomía Patológica I · PRÁCTICA (láminas)
   Na prova prática a professora pede, para cada lâmina: ÓRGANO · PROCESO · DESCRIPCIÓN (alteraciones) · DX.
   Fontes:
   - Láminas de la P1 e da P2: descrições projetadas pela Dra. Alicia Gonzalez nas aulas práticas
     (fotos "descrição da lámina" da pasta LAMINÁRIO do Drive da turma).
   - Temas da P2 prática: quadro "Temas P2 Práctica" (foto "Conteúdo P2" da pasta LAMINÁRIO P2).
   - Laminario completo: tabela "LAMINARIOS TOTAL CORRIGIDO" (25 láminas), com as fotos recortadas
     sem a etiqueta e sem os rótulos que entregavam a resposta.
   - 3 lâminas novas (duodenitis, enfermedad celíaca, adenocarcinoma gástrico tipo intestinal) e mais
     6 fotos extra de lâminas já existentes: PDF oficial "Laminas Anatopato I - Practica P1_P2_Final"
     (fotos de página inteira com ÓRGANO/PROCESO/DESCRIPCIÓN/DX já escritos pela cátedra).
   Fotos: { src } = arquivo do site; { drive } = foto pública da pasta LAMINÁRIO da turma.
   k: pdf (laminario), prof (imagem que a professora mandou), turma (foto tirada no microscópio da aula).
   Cada lâmina: organo/proceso/dx = [resposta, chaves]; desc = [[achado, chaves], ...] (corrigida em texto livre).
   g = grupo: a mesma lâmina em duas listas não sai duas vezes no simulacro. */
(function () {
  var A = window.SINUS_MAPAS && window.SINUS_MAPAS.anatopato;
  if (!A) return;
  function L(n) { return { src: 'img/laminario/lam-' + (n < 10 ? '0' : '') + n + '.jpg', k: 'pdf' }; }
  /* fotos oficiais de la prueba práctica (Drive: Laminas Anatopato I - Practica P1_P2_Final.pdf),
     cada una con ÓRGANO/PROCESO/DESCRIPCIÓN/DX proyectados tal cual los dio la cátedra */
  function L2(n) { return { src: 'img/laminario2/nuevo-' + (n < 10 ? '0' : '') + n + '.jpg', k: 'pdf' }; }
  function P() { return [].map.call(arguments, function (id) { return { drive: id, k: 'prof' }; }); }
  function F() { return [].map.call(arguments, function (id) { return { drive: id, k: 'turma' }; }); }
  function G(id, ver) { return { drive: id, ver: !!ver }; }

  var ORG = {
    corazon: ['Corazón', 'corazon|coracao|cardiac|miocardi'],
    prostata: ['Próstata', 'prostat'],
    esofago: ['Esófago', 'esofag'],
    testiculo: ['Testículo', '^testic'],
    tiroides: ['Glándula tiroides', 'tiroid|tireoid'],
    apendice: ['Apéndice cecal (vermiforme)', 'apendic'],
    higado: ['Hígado', 'higado|figado|hepat'],
    ovario: ['Ovario', 'ovar'],
    piel: ['Piel', 'piel|^pele|cutane'],
    rinon: ['Riñón', 'rinon|^rim|renal'],
    vaso: ['Vaso sanguíneo (arteria)', 'vaso|arteria|aorta|coronari'],
    vesicula: ['Vesícula biliar', 'vesicul'],
    parotida: ['Glándula parótida', 'parotid'],
    lengua: ['Lengua', 'lengua|lingua'],
    estomago: ['Estómago', 'estomag|gastric'],
    ileon: ['Intestino delgado (íleon)', 'intestin|ileo'],
    pancreas: ['Páncreas', 'pancrea'],
    trompa: ['Trompa uterina', 'trompa|^tuba|salping'],
    cervix: ['Cérvix (cuello uterino)', 'cervix|cuello uterino|cuello del utero|colo uterino|colo do utero|cervic'],
    vulva: ['Vulva', 'vulva'],
    duodeno: ['Duodeno', 'duoden']
  };
  var ADAPT = ['Adaptación', 'adapta|hipertrof|hiperplas|atrofi|metaplas'];
  var ACUM = ['Acúmulos intracelulares', 'acumul'];
  var AGUDA = ['Inflamación aguda', 'inflama;agud!cronic'];
  var CRON = ['Inflamación crónica', 'inflama;cronic!agud'];
  var NEO_B = ['Neoplasia benigna', 'neoplas|tumor;benign!malign'];
  var NEO_M = ['Neoplasia maligna', 'neoplas|tumor|cancer|carcinom;malign!benign'];
  /* banco de palavras do nível Guiado (os processos que aparecem nas descrições das láminas) */
  var PROCESOS = ['Adaptación', 'Acúmulos intracelulares', 'Necrosis coagulativa', 'Necrosis caseosa', 'Inflamación aguda', 'Inflamación crónica', 'Inflamación granulomatosa', 'Neoplasia benigna', 'Neoplasia maligna'];

  /* fotos da pasta LAMINÁRIO (P1 e P2) */
  var FT = {
    hipertrofia: F('1XzAimLhl_zYVrElF1XcG5YLARaArz_AC', '1--p7ZV6MlHGUAWIgOnzOE1kmUb7tjyGr', '1CbsDftAlyogs6g_vBpJuwbTN0fsk_3yl'),
    hpb: F('1cvs-Fqs2vFbIijD-6KAValzrPIUtzxdL', '1udslEOHz8tHBejrMqJdjYnPBvokp_QD-'),
    barret: P('1AP5aPwS2Vv9fmUX5Fnl2Ax1I3MqtZQla', '1KSYUdRDgSKrbxHeJPKClDEXP93Cld35q').concat(F('12SaiOSq2w533jBGWgpSxu3ZeSjiKN3Qn', '167ZAQ3eFCGbqmOgbGL9t0A2wcY1vZhzP', '1Kv1h1UvFYzN11Kv584ddAkGj1PNkfl8b', '1owXoQcX-AEphxRNtkkccJQvrggh0Fejk', '1rqbmNuYEbmWobbnOENz2N3bufFKzUvE5', '1tReY3LBH50L6owxgqjUj-WQx6r9UunXZ', '1xeTG7F4q76-y3MVIqoiBSl9CSrZG5BvB', '1xrW6UKuYEkFfW_MoCbNIfkbzTRQ7AbM7', '1SnwmIjHpf1izikp8aSP2CKmc3Gm34Onz', '1lnl9Bsm4j36QNcb18ZVeM0tmtqN6xuMP')),
    atrofia: P('10Wow0IfHu94DHEsY0Bt4TPUm3Y6jpd2C', '1KwglYX3nHANXWOgQbL5jVGo1w1kWseYZ', '1IrL3IBHY98xQ9t_D8Duxx3SRjIYNDA-i').concat(F('1-vA_o5jggHLHluXjkcyXhNDKGIrUXC3_', '1A3XOYYRoQdBbaNJpeGOuB9-edl6nr8E6', '1QHAP9Idzv77F81YOpQuoOM9W1X5Aqkck', '1QgnAsvKDqCYNGIY7TvD7s1iKrywiBNsx', '1Rt8lVJPfeCj6gY4CAM5mwJsDANwfjcNq', '1ioDMFKeOBxfv3bUAtYxNlbSUSWpOyK1I', '1kpMy3KodPPCoy8Ylgj8gbtYYG-Ql207p', '1u4ACvEV3NKvsxVjclTIbPGlfteHYVhuX', '1vAtICJ93Kb22_LSxFWpICsb0mkScTHi9', '1wv1-FutJxLiOuxPk4e0PVPTDUX0dp5vf', '192fPirV53v2cU_dqmvfuDL9p_H0XoFNK')),
    bocio: F('13MqqzQHnLrHwrdkyKca-RN2bfs8lh0aV', '1cU0KoONCxylcQsguGaoz1NcpOohClvHi'),
    iam: F('1ZOu8Ii0RXUWF-NFC_-jYyFVPJELMl_5m', '14I5RPbo5uY4HdeQRT1lDWR2v4tldkyKs', '1Y8FT-iEtjJoMauy2UJ3dK26KRcWXaUMe', '16M6-48bj9xbL9cl8ly33u96oJESx_yo4', '1XvREENEKrHUCyo8IULQo5VoGFAelP6yJ', '1ungSnk028EupDaP15nVaxXCMjucWf8g0', '1QrXE-DgNg71LEWDJrU3XaItozew0w-0h'),
    apendicitis: P('17RgfNzX1cKNALr1GZ7CDqGtCjSEe-CHy', '1i1jY_rJ8PvhqGsygD2ZJALbuU1nZ4qvQ', '1JRqvRFYOvv8F_2UgW0vKY3kO4DkzjjHe', '1jJJGtv-gr_aUrNFrLWxTWb9iqupA5X0d', '10wtOsTkQUfkS2hxS3Xc1AyDPlGwgF49C', '1LZ404xy2Mubk3NA2DC0GXTz-YVQs-lEP', '1cQRMOBugGILmYR8WWkZprzxvD9WXe7_h', '18KPN0Hjmbfq_AuTX0q4mVMdKOzTnRzlH').concat(F('1dUMClFWqZL7d4-r4_F9evvKcDuK4jmUH', '15yI546aF1_wwrXaO6fuS40hdENqDFwNg', '1gGvVUKIBvQwhyjTjZAXaZOtuUXlzidvi', '1B6B2wNJIFFnbq5cpCNESCn2tFV9KSv3M', '153KUKeyjQNfTxVf2mvh1ccN5aY2gefre', '1rYJud0LVUa0CDHUVsXnp54DOkxYo4Jgs', '13P9Z5QUlzA7jFNvtH2arygnt2_TpLuC8', '1smoEI2p_yPtgOS4_ceObtZIJBWLrqWTY')),
    higado: P('1hZ6GuXlAc7QkLLWyh8leLJZhytdkUdBJ', '1SFG2UVnneKTe5hsrmEXKa0xxctqj6rxv', '1YpTJ_Mi7TeIHV8cChH8ZrUu-LQ0QAcMX').concat(F('18RzZXelGobSC2k8KUyXzih9geTebnSw_', '1ExGcAo2inFYGtan99_RSoCR3TUWmKI23', '1DAOgwuB_hofntY2Dkxf4zYrHe4lct5aF', '1--PR0AUrE4D-eYjcLbkZlK0ugOaEhvUD', '1BJzemsmdbwp-hvUu9gxiYAm9spvs8Be-', '1NWWwocDjWIDivVJTeIeMoilMg1PFbKpZ', '13CRPod78gtvOe7WBX99HBK3u43yeJpmx', '1uOmVx6D7tirkiqJ5-bbI2pF1yjJyvNBK', '1He3EmD-4XNHfe_g7KN7Eyp5-lHJw8tcb', '1pxLnN5jRWvKxv3x-sssKffEjKXCbkU3v', '1A2tKMdNFXf0S27qKi64m5HTHkOSOoNSp', '1TTWnTG0jjPeRfp7xyJxjsUAolaU7fArF', '11sul5prd7aQext3WO6cO8mGKSo_saEsM', '1vYD3WDOzw7gHO8JDEnzybs6TU31nV6gs', '1K4LqG_eAzY4v5OyvTh3b-2bRVMw3lFXv', '1ea7ZguvqHeChpM_yLfsHgYOENyamnG14', '1bR2_9vTZT9Ao_YPn4WpKsU9qaFEp0BVj', '11XihIRp7vFJIDficx92UG0OSM4vRi2aI')),
    tbc: P('1O4vo23fgpfdxzuAikr7bAAsXFSRL6mff', '1EwIqMUV3d1bEIscogJHlxdNMAuV7WY0Y', '1OxP9KuOMAgnIEcRXsi4m_SrWJ6J1TNCE', '1bHQyYrYxYUcvQMSkn-45S2xgA-olvxRf', '133pmaWeWhhU3rI4_8vjzEX_41YnHUMpp', '1BH8qisdKS0i0PpQfjXBlXsrudVjaUZMk', '1Kn5gT_H_-X1CAMaxb5xbw6YzaA2uRWIP', '1BofPyX0Xrbe-M2r_lIlsua0CG49EToQw', '1d-l43wNTfl00cGu8k__sEPlXkbuKjno_', '1BLrBxWr78rkQR1kjirZ2Y9hiBmMRMlfd').concat(F('16RXB5Um2hIiBA1aF1BmFZNmuOeG-Wyk0', '1M0-Ac9r3La3hAedb7iP7k3Ig4d2loxKD', '1evIUbsdJ0Xm6EcbnD0cojnmUoxMJonuh', '1VLF0wfGiIsph97GC1--z7QW2qQThBGbL', '1gkmPjgZ13xO-g3UvIc8ZmqLAOAmVAFbj', '1YSgRLxPN7on7MzPTLND9fNuqQRa7X3eV')),
    melanoma: P('18xBMY7oDTyC5WtEFtvxwsa2pst_H4kMT', '1BFocHa5_FPaBFljO4lWOujp3zgjtX8Iw', '1Tgq13miDf2rUbbh2cpiUwnzhlIy0cVtO', '1OLMcIY7wQBk8Crs9KUwGH6SzpshWOiWD').concat(F('1GcCk92KK_mBeuSGnea1Kju-neEgNOiQ2', '1C5Xh3ebXxSy_wm4epW0S0C41EzSAuSG8', '1G4RHlyhxsOQt_dEPZFrcQ9Lp3liAcrfV', '1UGwkjRsUAkVOJpEt8SZQILgy6_j3DOQJ', '1KL305S2qr5UHyNzwfVWkRkplcfwKlBls', '1A742IpxVCRpRTUjX7p-Dxjaz92-Eo9TJ', '1K9mv73DYescqP9UcaKsAcgzwfuL4RVOr', '1tqtoiIyOt7FHE8HNYY9u-nc5O0vlYf-p', '1gTUydoh0TGBedU39fWQRhhteg92IF6Bb', '1MxpIWSkig8W738RRuvGo-LD0zmlQj8Vz', '1PU03s-Ea-ty9b85elNzRIu2w_J_VqPEe')),
    pielonefritis: P('1lBvfYywFBjIMJ-qfmgXcH8MI1-oUBiFG', '1RGJ1CHgAtm18KzH9HmjO5WsCcwh826Ty', '1h5zDu5mdJHvUqhoe85IBX_y-9WaE3-ek', '12CgyChfi8v329fcGjzG1oFWnYIBPh_b5', '1FsdWLm-tivu-RUia9QGr5DRexd1dBFTJ', '1jE48PUQhwTDicM9-da4srXSLgOVLd4aG', '1Fy6Dqjp0Q6pTlH0lW07q8B9MdC3Rh3Vb', '1IAO4QJZmBaNyqc80AaxobPXPIV5pSyMG', '1t2c7FfvI9bkW1PhZKvH69zHNayRHTPiE', '1FGOayff2qKUwy36sRG4U11wBuTDrvBo0').concat(F('1zoCN_Ee5tiotZMIqTRtTtO-jfsLpNd_c', '12QRp7l6JR-gCnP7IRzbqi75nvWvSCH8Y', '1T0C3OlgqQwqaEvX0Q2X15iq_A6n1bXqQ', '1l7eG3n7pZBqwK64Z2-7GA8lkzyb-Kj8W', '12paEcT6_f1Pe2auP39Xrm_Yl_hKnUH5-', '1LqXQvKD4z50hip5Z_rDV2hsGwdK91JAa', '1uBANMlyUf0jf3v13N9EO0_Qi1HGp_Yep', '1XIRUOqs64958dQiUIl_ozuqvn7zmdF3E', '1S3tIBPoQOGl2dwkBFHL7b77qHGEVDBVL', '1pZL3Wu1bGurE5_5PJ-Ul5I92GSlZzc3R', '1fn2cxySqBRPecCawYKTGXeOU_nWn8z2r', '1blji9JvQa2zam7iT6uZMqeCB3rgYcWaX', '1J5ATOLcAQSUEZqytKTK0vp-CpbbKiwWB', '1_qWz315TGrY5fP9ZXh-NlBgSoJlWcyeC')),
    aterosclerosis: P('1oqALL1cCDq1BI-IP7Ps4ia9lciikBmZI', '1K0xjDjBVT9yUPRAHJZQzHLSlCRH8E_o_', '1erjrnCylABmPkOnBSsu5E-DMRRMakNyK', '1zDIqkow4her7pHKneUppvhM3PpUV_QPc', '1h6q3g7EpOqkdPgKefRLv0nwPZSSCP7Fe', '1w_Sr_xSffRisFuVktu9R6q2hvDjmQkyA', '1IU4xor21xB4XGXP_y76nNdrNX2hdgHmI', '1-u0IlsAFSUFslKmSXd86W1nCIFjJ83bx', '1_qcvJ3NJ0a_Y40xHsq0k8iHXebN4Y98J').concat(F('1VcajfSJl5EaFrR33-Jjfr-DHvD4Jo8ui', '1k9T7dKgjmi-JtXLcferXXQ9SuFeeCR-3', '12NIpNEu6NbOdTORz98fonRqoFpY_dT2n', '1H5q1P35H5eFBcY04Rifa_6xeBnnyjc64', '1VgNcQ1Y2HfIsXvkbMRch0kUFPZRvm4m0', '1fj9u1oRqndijgdqQNzcdJHT4cn3nln6i', '1kBZRUBV_gguu6wtQeisuG7i_Cvi1-Tp9', '1ZFHPLdY3zS0y2ap5SDGooC2QyiPtD0CE', '19PGyfPa3_3Jwq1gL0VHV4vDkrMzb6Gf2')),
    colesterolosis: P('1PVBqplZe0UIhCl6tDvbc5ssM73LG6pq6', '1Xw2yEbbsj6NfDFKzOwbFGrFXMyGDxORo', '1mItNKgsUqm9J0felHW6XHnvJyAkO9UmZ').concat(F('1K5IS7Kqh6T8WYQNdfcHMMz48B7a8ZxnM', '1uKoJeYztOj3L4yp8K7vrsb5byI1t2zsL', '1jxOWXfBRv80V0rYwwLn0iYQ5dFd80__c', '1b5BJ6fXE6YkY-OHOYdji4qL9Lc_j9bmf', '1kXjYaRA3dZVMZo5NhMc6u4oTcoAdlOv3', '1lqnLyCX-G55XZN01zXQP9x8TzRfC5Mxb', '1J8numuo87wxxlZg73Bxq1nYEk-f0cmL1', '1HLn5hrnWtxPhL3cQTJzjmpa0sB9orqHy'))
  };

  /* ───────── P1 práctica: las 5 láminas que la profesora indicó para la prueba ───────── */
  var P1 = [
    { id: 'hipertrofia', g: 'hipertrofia', nome: 'Hipertrofia cardíaca', img: [L(2)].concat(FT.hipertrofia), gab: [G('1ZC7XQShX43kEf_RoV-DrTwUp7gkXC9jg')],
      organo: ORG.corazon, proceso: ['Adaptativo', 'adapta|hipertrof'],
      desc: [
        ['Cardiomiocitos hipertróficos', 'hipertrof|aumentad de tamano|aumento de tamano|aumentad|agrandad'],
        ['Anormalmente ramificados', 'ramific'],
        ['Núcleos hipercromáticos y agrandados', 'hipercrom|nucleos agrandad|nucleo agrandad|nucleos grandes|nucleo grande|cariomegal'],
        ['Disposición irregular', 'irregular|desorganiz|desordenad'],
        ['Fibrosis cicatricial', 'fibros|cicatri'],
        ['Lipofucsina', 'lipofu']
      ],
      dx: ['Hipertrofia cardíaca', 'hipertrof'] },
    { id: 'hpb', g: 'hpb', nome: 'Hiperplasia prostática benigna', img: [L(24)].concat(FT.hpb), gab: [G('1mYFzaNc4n8fO2g_7pUiQBMlLwEd4yjHp')],
      organo: ORG.prostata, proceso: ['Adaptativo / inflamatorio crónico', 'adapta|hiperplas;inflama|cronic'],
      desc: [
        ['Proliferación de glándulas benignas (aumento del número de células)', 'prolifer|aumento del numero|aumento de numero|numero de celulas'],
        ['Dilataciones glandulares', 'dilata'],
        ['Invaginaciones papilares', 'papila|invagin'],
        ['Áreas quísticas con cuerpos amiláceos', 'amilac|quist|cistic'],
        ['Infiltrado inflamatorio crónico sobreagregado', 'infiltrad|inflamator|linfocit']
      ],
      dx: ['Hiperplasia prostática benigna; prostatitis crónica', 'hiperplas|^hpb;prostatit'] },
    { id: 'barret', g: 'barret', nome: 'Esófago de Barrett', img: [L(5)].concat(FT.barret),
      gab: [G('1Bl6AKwlJm-H9oKs9maTYegP3bMlslZ3h', 1), G('12Cf2TAMeMlhn1rw1Wo13peBVGFNU93vq', 1), G('1shhd7Ssxgszm-dO-xZOud5yWXMu2bWaO')],
      organo: ORG.esofago, proceso: ['Adaptación celular (metaplasia)', 'metaplas|adapta'],
      desc: [
        ['Fragmentos de epitelio escamoso esofágico', 'escamos|plano estratif|pavimentos'],
        ['Reemplazado por epitelio cilíndrico simple', 'cilindric|columnar'],
        ['Con microvellosidades', 'microvell|microvilo|microvilosidad'],
        ['Células caliciformes', 'calicif']
      ],
      dx: ['Esófago de Barrett', 'barret'] },
    { id: 'atrofia', g: 'atrofia', nome: 'Atrofia testicular', img: [L(23)].concat(FT.atrofia),
      gab: [G('1akP97wLEABONlJ1JIl5iuocodrn7F5LE', 1), G('1cxfjvio3LOPwTLDCXRYVVD6McfhcP1Qj', 1), G('1VMAVowK75KzpbRMuZEdwY4SRVx7UGQEJ')],
      organo: ORG.testiculo, proceso: ['Adaptativo', 'adapta|atrofi'],
      desc: [
        ['Desaparición del epitelio tubular', 'desaparic|perdida del epitelio|perda do epitelio|sin epitelio|sem epitelio|ausencia de epitelio|ausencia del epitelio'],
        ['Túbulos pequeños y escleróticos', 'escleros|esclerot|tubulos pequen|pequenos tubulos'],
        ['Áreas de fibrosis intersticial', 'fibros'],
        ['Aumento de células de Leydig', 'leydig']
      ],
      dx: ['Atrofia testicular', '^atrofi'] },
    { id: 'bocio', g: 'bocio', nome: 'Bocio coloide multinodular', img: FT.bocio, gab: [G('1M3Pg7U1NI2_4bBgxERgGTuqaP9C0FpJT')],
      organo: ORG.tiroides, proceso: ['Adaptativo', 'adapta|hiperplas'],
      desc: [
        ['Folículos dilatados de tamaño variable', 'dilata|variab|variav'],
        ['Epitelio aplanado en sectores', 'aplanad|achatad|epitelio plano'],
        ['Hiperplásico en otros sectores', 'hiperplas'],
        ['Áreas de hemorragia', 'hemorrag']
      ],
      dx: ['Bocio coloide multinodular', 'bocio;coloide|multinodul'] }
  ];

  /* ───────── P2 práctica: necrosis, inflamación y acúmulos ───────── */
  var P2 = [
    { id: 'iam', g: 'iam', nome: 'Infarto agudo de miocardio', img: [L(1)].concat(FT.iam), gab: [G('1AwwXQRH-pSbJfEue1Kq6li8ZIv1TFk0M')],
      organo: ORG.corazon, proceso: ['Necrosis coagulativa isquémica', 'necros;coagul'],
      desc: [
        ['Cardiomiocitos anucleados por cariólisis', 'anucle|cariolis|sin nucleo|sem nucleo'],
        ['Infiltrado de neutrófilos', 'neutrofil|polimorfonuc'],
        ['Áreas de hemorragia', 'hemorrag']
      ],
      dx: ['Infarto agudo de miocardio', 'infarto|^iam'] },
    { id: 'apendicitis', g: 'apendicitis', nome: 'Apendicitis aguda', img: [L(10)].concat(FT.apendicitis), gab: [G('1T9Ke2qJLyFQQ6FRPwZ5S2F10uPggy7yi')],
      organo: ORG.apendice, proceso: ['Inflamatorio agudo', 'inflama;agud!cronic'],
      desc: [
        ['Necrosis transmural, de la mucosa a la serosa', 'transmural|necros'],
        ['Abundantes neutrófilos en todas las capas', 'neutrofil|polimorfonuc'],
        ['Hemorragia', 'hemorrag'],
        ['Erosión y úlcera', 'erosi|ulcer']
      ],
      dx: ['Apendicitis aguda gangrenosa con periapendicitis supurada', 'apendicit;gangren|periapend|supurad'] },
    { id: 'esteatosis', g: 'esteatosis', nome: 'Esteatosis hepática', img: FT.higado, gab: [G('1NEyJpJAavRSSL5e2Ei4kb9Bfb0f2Q5qJ')],
      organo: ORG.higado, proceso: ACUM,
      desc: [
        ['Histoarquitectura alterada', 'arquitectura|histoarquit'],
        ['Hepatocitos con vacuolas lipídicas', 'vacuol|lipid|grasa|gordura'],
        ['Triglicéridos', 'triglic']
      ],
      dx: ['Esteatosis hepática', 'esteatos|higado graso|figado gorduroso'] },
    { id: 'tbc', g: 'tbc', nome: 'Tuberculosis (ovario)', img: FT.tbc, gab: [G('1GgEt-IbDEiczjc1EFiiSyO_tCPzuCC1O')],
      organo: ORG.ovario, proceso: ['Inflamatorio crónico granulomatoso / necrosis caseosa', 'granulom|inflama;caseos'],
      desc: [
        ['Linfocitos', 'linfocit'],
        ['Células epitelioides', 'epitelioid'],
        ['Células plasmáticas', 'plasmatic|plasmocit'],
        ['Fibroblastos', 'fibroblast'],
        ['Células gigantes multinucleadas de tipo Langhans', 'langhans|gigante'],
        ['Necrosis caseosa', 'caseos']
      ],
      dx: ['Tuberculosis', 'tuberculos|^tbc|^tb'] },
    { id: 'melanoma', g: 'melanoma', nome: 'Melanoma', img: FT.melanoma, gab: [G('1WZa5iW5V5qUTU5KvE4bo9E_0uUkzRjLm')],
      obs: 'En la clase de pigmentos la profesora lo describió como acúmulo intracelular (pigmento de melanina).',
      organo: ORG.piel, proceso: ACUM,
      desc: [
        ['Epidermis con acantosis', 'acantos'],
        ['Papilomatosis', 'papilomat'],
        ['Células atípicas en la dermis superficial y profunda', 'atipi'],
        ['Pigmento de melanina', 'melanin']
      ],
      dx: ['Melanoma', 'melanoma'] },
    { id: 'pielonefritis', g: 'pielonefritis', nome: 'Pielonefritis crónica', img: FT.pielonefritis, gab: [G('1cY-muGd5nexTQtAKZiwrOjaH4OUdf92T')],
      organo: ORG.rinon, proceso: ['Inflamatorio crónico', 'inflama;cronic!agud'],
      desc: [
        ['Inflamación crónica tubulointersticial', 'tubulointerst|intersticial'],
        ['Atrofia tubular («tiroidización»)', 'tiroidiz|tireoidiz|atrofi'],
        ['Áreas de fibrosis', 'fibros']
      ],
      dx: ['Pielonefritis crónica', 'pielonefrit'] },
    { id: 'aterosclerosis', g: 'aterosclerosis', nome: 'Aterosclerosis', img: FT.aterosclerosis, gab: [G('1fM_Fmf5yF6Jw4UDd0FlgZDBm5fz0sPUI')],
      organo: ORG.vaso, proceso: ACUM,
      desc: [
        ['Hendiduras de colesterol', 'hendidur|fenda|colesterol'],
        ['Macrófagos espumosos cargados de lípidos', 'espumos'],
        ['Áreas de calcificación distrófica', 'calcific']
      ],
      dx: ['Aterosclerosis', 'ateroscler|ateroma'] },
    { id: 'colesterolosis', g: 'colesterolosis', nome: 'Colesterolosis', img: FT.colesterolosis, gab: [G('1_x6kD1Hzz7o_CB4p7gMB3Vb7YhNQbsUn')],
      organo: ORG.vesicula, proceso: ACUM,
      desc: [
        ['Macrófagos espumosos cargados de colesterol', 'espumos'],
        ['En la lámina propia', 'lamina propia']
      ],
      obs: 'En el pizarrón de temas de la P2: «V. biliar → colesterolosis / colecistitis crónica».',
      dx: ['Colesterolosis', 'colesterolos|colecistit'] }
  ];

  /* ───────── Laminario completo (tabla corregida, 25 láminas) ───────── */
  function T(n, organo, proceso, desc, dx, g, extra) {
    return { id: 't' + n, g: g || ('t' + n), nome: dx[0], img: [L(n)].concat(extra || []), organo: organo, proceso: proceso, desc: desc, dx: dx };
  }
  var TOTAL = [
    T(1, ORG.corazon, ['Necrosis coagulativa isquémica', 'necros;coagul'], [
      ['Hemorragia / hematíes', 'hemorrag|hemat|hemacia'],
      ['Infiltrado de neutrófilos (1 a 3 días de evolución)', 'neutrofil|polimorfonuc'],
      ['Miocardiocitos sin núcleo (cariólisis)', 'cariolis|sin nucleo|sem nucleo|anucle']], ['Infarto agudo del miocardio', 'infarto|^iam'], 'iam', FT.iam),
    T(2, ORG.corazon, ['Adaptación: hipertrofia', 'adapta|hipertrof'], [
      ['Miocardiocitos aumentados (hipertrofiados)', 'hipertrof|aumentad'],
      ['Fibroblastos intersticiales; núcleo centrado y agrandado', 'fibroblast|nucleo centrad|nucleo agrandad|nucleos agrandad'],
      ['Lipofucsina cerca del núcleo', 'lipofu']], ['Hipertrofia cardíaca', 'hipertrof'], 'hipertrofia', FT.hipertrofia),
    T(3, ORG.parotida, NEO_B, [
      ['Tejido mixoide, estroma, cápsulas fibrosas', 'mixoide|capsula|estroma'],
      ['Células epiteliales y mioepiteliales', 'mioepitel'],
      ['Sin atipia; pseudoquistes', 'sin atipia|sem atipia|pseudoquist|pseudocist']], ['Adenoma pleomorfo de glándula parótida', 'pleomorf|tumor mixto']),
    T(4, ORG.lengua, NEO_M, [
      ['Perlas de queratina, hiperqueratosis, acantosis', 'perla|hiperquerat|acantos'],
      ['Rosetas de queratina (globos córneos), papilas filiformes', 'globos corneos|globo corneo|roseta|papilas filiformes'],
      ['Nidos de células neoplásicas malignas con atipia', 'nidos|ninhos|atipi']], ['Carcinoma epidermoide de lengua', 'carcinom;epidermoid|escamos']),
    T(5, ORG.esofago, ['Adaptación: metaplasia', 'adapta|metaplas'], [
      ['Epitelio plano estratificado (esofágico)…', 'plano estratif|escamos|pavimentos'],
      ['…reemplazado por epitelio cilíndrico simple', 'cilindric|columnar'],
      ['Con células caliciformes', 'calicif']], ['Esófago de Barrett', 'barret'], 'barret', FT.barret),
    T(6, ORG.esofago, NEO_M, [
      ['Proliferación neoplásica maligna agrupada', 'prolifer|agrupad'],
      ['Nidos sólidos con atipias; coilocitos', 'nidos|ninhos|atipi|coilocit'],
      ['Perlas de queratina, hiperqueratosis', 'perla|hiperquerat']], ['Carcinoma epidermoide de esófago', 'carcinom;epidermoid|escamos']),
    T(7, ORG.estomago, NEO_M, [
      ['Células en anillo de sello, patrón difuso (pérdida de cadherina E)', 'anillo de sello|anel de sinete|sello|sinete|cadherina'],
      ['Desmoplasia (aumento del tejido conjuntivo, colágeno)', 'desmoplas|colagen'],
      ['Células neoplásicas difusas con pleomorfismo e hipercromasia', 'pleomorf|hipercrom']], ['Carcinoma gástrico de tipo difuso (Lauren)', 'carcinom;difus']),
    T(8, ORG.estomago, CRON, [
      ['Atrofia de la mucosa, submucosa y glándulas gástricas', 'atrofi'],
      ['Infiltrado linfocitario, angiogénesis y fibrosis', 'linfocit|angiogen|fibros'],
      ['Células parietales; ulceración o erosión', 'parietal|ulcera|erosi']], ['Gastritis crónica', 'gastrit;cronic']),
    T(9, ORG.ileon, ['Inflamación crónica granulomatosa', 'granulom'], [
      ['Afectación transmural de todas las capas; fibrosis', 'transmural|todas las capas|todas as camadas|fibros'],
      ['Úlcera «en cuchillo», infiltrado linfocitario, distorsión de las criptas', 'cuchillo|faca|cripta|linfocit|ulcer'],
      ['Linfangiectasia; hiperplasia de células de Paneth', 'linfangiect|linfangect|paneth']], ['Enfermedad de Crohn', 'crohn']),
    T(10, ORG.apendice, AGUDA, [
      ['Ulceraciones de la mucosa', 'ulcera'],
      ['Infiltrado de neutrófilos (capa muscular), edema, necrosis', 'neutrofil|edema|necros'],
      ['Vasos hiperémicos dilatados (serosa), hemorragia', 'hiperemi|dilatad|hemorrag|congest']], ['Apendicitis aguda', 'apendicit'], 'apendicitis', FT.apendicitis),
    T(11, ORG.pancreas, CRON, [
      ['Atrofia y pérdida acinar; fibrosis', 'acin|atrofi|fibros'],
      ['Infiltrado de linfocitos (nidos de linfocitos)', 'linfocit'],
      ['Islotes de Langerhans hipertrofiados; angiogénesis', 'langerhans|islote|ilhota|angiogen']], ['Pancreatitis crónica', 'pancreatit;cronic']),
    T(12, ORG.pancreas, NEO_M, [
      ['Infiltrado inflamatorio', 'infiltrad|inflamat'],
      ['Fibrosis, angiogénesis', 'fibros|angiogen'],
      ['Glándulas malignas con proyección', 'glandul|proyecc|projec']], ['Adenocarcinoma de páncreas moderadamente diferenciado (grado II)', 'adenocarcinom']),
    T(13, ORG.higado, CRON, [
      ['Fibrosis en puente de una tríada a otra; infiltrado linfocitario', 'puente|ponte|fibros|linfocit'],
      ['Hepatocitos cargados de lípidos que desvían el núcleo a la periferia', 'lipid|grasa|gordura|periferi|vacuol'],
      ['Angiogénesis, nódulos de regeneración, hemorragia', 'nodulo|regenerac|angiogen|hemorrag']], ['Cirrosis hepática', 'cirros']),
    T(14, ORG.higado, NEO_M, [
      ['Hepatocitos con atipias', 'atipi'],
      ['Patrón de crecimiento en cordones', 'cordon|cordoes|trabecul'],
      ['Células eosinófilas', 'eosinof']], ['Hepatocarcinoma', 'hepatocarcinom|hepatocelular']),
    T(15, ORG.tiroides, CRON, [
      ['Atrofia folicular, linfocitos dispersos, metaplasia', 'atrofi|metaplas|linfocitos dispersos'],
      ['Nódulos linfáticos con centro germinativo activo', 'germinativ|nodulos linf|foliculos linf'],
      ['Células de Hürthle', 'hurthle|hurtle|hirtle']], ['Tiroiditis de Hashimoto', 'hashimoto']),
    T(16, ORG.rinon, NEO_M, [
      ['Componente blastematoso', 'blastem'],
      ['Componente epitelial', 'epitelial'],
      ['Componente estromal', 'estrom']], ['Tumor de Wilms (nefroblastoma)', 'wilms|nefroblastom']),
    T(17, ORG.trompa, CRON, [
      ['Glándulas endometriales benignas', 'endometri'],
      ['Estroma denso', 'estroma']], ['Endometriosis en trompa uterina', 'endometrios']),
    T(18, ORG.ovario, NEO_B, [
      ['Dilataciones quísticas', 'quist|cistic'],
      ['Epitelio cilíndrico ciliado', 'cilindric|ciliad|columnar'],
      ['Componente homogéneo que corresponde a mucina', 'mucin|homogen']], ['Cistoadenoma mucinoso', 'cistoadenom;mucinos']),
    T(19, ORG.cervix, CRON, [
      ['Atipia o cambios citopáticos (coilocitos)', 'coilocit|citopatic|atipi'],
      ['Abundante infiltrado inflamatorio crónico', 'infiltrad|inflamat']], ['Cervicitis crónica', 'cervicit']),
    T(20, ORG.vulva, NEO_B, [
      ['Arquitectura verrugosa', 'verrug'],
      ['Acantosis, papilomatosis, hiperqueratosis', 'acantos|papilomat|hiperquerat'],
      ['Células con cambios citopáticos (coilocitos)', 'coilocit|citopatic']], ['Condiloma acuminado', 'condilom']),
    T(21, ORG.cervix, NEO_M, [
      ['Proliferación celular maligna en nidos', 'nidos|ninhos'],
      ['Escasos puentes intercelulares', 'puentes|pontes'],
      ['Pleomorfismo marcado', 'pleomorf'],
      ['No se observa queratinización', 'no se observa queratin|sin queratin|sem queratin|no queratin|nao queratin|ausencia de queratin']], ['Carcinoma escamoso de cuello uterino', 'carcinom;escamos|epidermoid']),
    T(22, ORG.ovario, ['Neoplasia benigna (mixta)', 'neoplas|tumor;benign!malign'], [
      ['Tejido epitelial', 'epitel'],
      ['Glándulas sebáceas', 'sebace'],
      ['Glándulas sudoríparas', 'sudorip'],
      ['Folículos pilosos', 'pilos'],
      ['Tejido adiposo', 'adipos']], ['Teratoma ovárico maduro', 'teratom']),
    T(23, ORG.testiculo, ['Adaptación: atrofia', 'adapta|atrofi'], [
      ['Túbulos seminíferos atrofiados con espermatogénesis inactiva', 'espermatogen|atrofi'],
      ['Pocas células de Sertoli', 'sertoli'],
      ['Engrosamiento de la membrana basal', 'membrana basal|engrosam|espessam'],
      ['Aumento de células de Leydig en el intersticio', 'leydig']], ['Atrofia testicular', '^atrofi'], 'atrofia', FT.atrofia),
    T(24, ORG.prostata, ['Adaptación: hiperplasia', 'adapta|hiperplas'], [
      ['Proliferación del tejido glandular', 'prolifer|glandul'],
      ['Aumento del estroma fibromuscular', 'fibromuscular|estroma'],
      ['Cuerpos amiláceos', 'amilac']], ['Hiperplasia prostática benigna', 'hiperplas|^hpb'], 'hpb', FT.hpb),
    T(25, ORG.testiculo, NEO_M, [
      ['Proliferación neoplásica de tipo germinal, en nidos', 'germinal|nidos|ninhos'],
      ['Células cúbicas a poliédricas de citoplasma claro, nucléolos grandes', 'citoplasma claro|nucleolo|poliedric|cubic'],
      ['Tabiques de tejido conectivo con linfocitos', 'tabique|septo|linfocit']], ['Seminoma', 'seminom']),
    T(26, ORG.duodeno, CRON, [
      ['Erosión del epitelio', 'erosi'],
      ['Infiltrado linfoplasmocitario en la lámina propia', 'linfoplasmocit|infiltrad'],
      ['Hiperplasia de las glándulas de Brunner', 'brunner|hiperplas']], ['Duodenitis crónica', 'duodenit']),
    T(27, ORG.duodeno, CRON, [
      ['Mucosa duodenal conservada', 'mucosa;conserv'],
      ['Numerosos linfocitos intraepiteliales', 'intraepitel|linfocit'],
      ['Proceso inflamatorio crónico en la lámina propia', 'inflama;cronic']], ['Enfermedad celíaca (Marsh tipo 2)', 'celiac|marsh']),
    T(28, ORG.estomago, NEO_M, [
      ['Proliferación de células neoplásicas malignas con atipia moderada', 'prolifer|atipi'],
      ['Patrón glandular', 'glandul|patron']], ['Adenocarcinoma gástrico de tipo intestinal (Lauren)', 'adenocarcinom;intestinal'])
  ];
  /* las 25 láminas del laminario no tenían foto propia para el 26/27/28 (son lâminas nuevas, sin
     número en la tabla), así que reemplazamos su imagen de placeholder L(n) por la foto real;
     a las 6 lâminas de arriba que ya existían les sumamos la foto oficial como imagen extra */
  (function (byId2) {
    byId2('t3').img.push(L2(9));
    byId2('t4').img.push(L2(8));
    byId2('t5').img.push(L2(6));
    byId2('t6').img.push(L2(7));
    byId2('t7').img.push(L2(4));
    byId2('t8').img.push(L2(5));
    byId2('t26').img = [L2(1)];
    byId2('t27').img = [L2(2)];
    byId2('t28').img = [L2(3)];
  })(function (id) { for (var i = 0; i < TOTAL.length; i++) if (TOTAL[i].id === id) return TOTAL[i]; return null; });

  var SRC_P = 'Descripciones proyectadas por la Dra. Alicia Gonzalez en las clases prácticas (fotos «descripción de la lámina» de la pasta LAMINÁRIO)';
  var SRC_T = 'Tabla «Laminarios total corregido»: ÓRGANO, PROCESO, DESCRIPCIÓN y DX de las 25 láminas';
  function par(id, clase, titulo, r1, r2, fuente, laminas) {
    var base = { area: 'pratica', tipo: 'laminas', clase: clase, titulo: titulo, fuente: fuente, laminas: laminas, procesos: PROCESOS };
    return [
      Object.assign({ id: id, par: id + '_d', nivel: '1', banco: true, resumen: r1 }, base),
      Object.assign({ id: id + '_d', par: id, nivel: '2', barajar: true, resumen: r2 }, base)
    ];
  }
  /* P2 na ordem do quadro «Temas P2 Práctica»: 1 IAM, 2 TBC, 3 aterosclerosis, 4 vesícula biliar, 5 esteatosis,
     6 melanoma, 7 apendicitis, 8 pielonefritis, 9 Hashimoto y 10 cirrosis (estas dos, con la foto y la descripción del laminario) */
  function byId(arr, id) { for (var i = 0; i < arr.length; i++) if (arr[i].id === id) return arr[i]; return null; }
  var P2Q = ['iam', 'tbc', 'aterosclerosis', 'colesterolosis', 'esteatosis', 'melanoma', 'apendicitis', 'pielonefritis'].map(function (id) { return byId(P2, id); })
    .concat([byId(TOTAL, 't15'), byId(TOTAL, 't13')]);
  function uniq(arr) { var out = []; arr.forEach(function (x) { if (out.indexOf(x) < 0) out.push(x); }); return out; }

  /* ───────── Teoria das aulas práticas da Dra. Alicia Gonzalez (pasta da turma G) ─────────
     p1 = "clase 1-Adaptación Celular parte 1", p1b = "parte 2", p2 = "clase 2-Lesión celular",
     p3 = "clase 3-Acumulos intracelulares", p4 = "clase 4-Inflamación crónica" (a "PARTE 1" de inflamación
     aguda já não está no Drive). Pizarrón de 30/09: foto "Quadro Dra alicia anatopato pratica 30/09". */
  A.clases = Object.assign(A.clases || {}, {
    p1: ['Práctica 1 · Adaptación celular (parte 1)', 'Práct. 1'],
    p1b: ['Práctica 1 · Adaptación celular (parte 2)', 'Práct. 1 (2)'],
    p2: ['Práctica 2 · Lesión celular', 'Práct. 2'],
    p3: ['Práctica 3 · Acúmulos intracelulares', 'Práct. 3'],
    p4: ['Práctica 4 · Inflamación crónica', 'Práct. 4']
  });
  var PR = 'pratica';
  var TEO_P1 = [
    {
      id: 'ap_pr_adaptacion', area: PR, clase: 'Práctica 1', titulo: 'Adaptación celular en la práctica', tipo: 'mapa', sl: [['p1', 5, 18], ['p1b', 2, 14]],
      centro: 'Adaptación celular', sub: 'Lo que la Dra. González explica antes de las láminas',
      fuente: 'Práctica 1 · Hiperplasia, hipertrofia, atrofia y metaplasia (partes 1 y 2)',
      ramas: [
        { t: 'Hiperplasia', hojas: [
          ['Aumento del… de células en un órgano o tejido', 'Número', 'numero'],
          ['Ejemplo de la clase, junto con hipertrofia: el crecimiento hormonal del…', 'Útero en el embarazo || Útero', 'utero'],
          ['La HPB es inducida por…', 'Andrógenos', 'androgen'],
          ['Es un terreno fértil para que surja después una proliferación…', 'Cancerosa', 'cancer'],
          ['Principal causa de la hiperplasia folicular en el bocio por déficit de yodo', 'Aumento de la secreción de TSH || Aumento de TSH', 'tsh']
        ] },
        { t: 'Hipertrofia', hojas: [
          ['Aumento del… de las células', 'Tamaño', 'tamano'],
          ['No se debe a la hinchazón sino a la síntesis de más componentes…', 'Estructurales', 'estructural'],
          ['Células que no se dividen y solo pueden hipertrofiarse', 'Miocárdicas || Cardiomiocitos', 'miocard|cardiomioc']
        ] },
        { t: 'Atrofia', hojas: [
          ['Disminución del tamaño de la célula por pérdida de sustancia…', 'Celular', 'celular'],
          ['La de la notocorda y el conducto tirogloso en el desarrollo fetal', 'Fisiológica', 'fisiolog'],
          ['Depende de la causa; puede ser localizada o generalizada', 'Patológica', 'patolog']
        ] },
        { t: 'Metaplasia', hojas: [
          ['Cambio reversible: una célula adulta se sustituye por otro tipo celular…', 'Adulto', 'adulto'],
          ['La más frecuente: de columnar a…', 'Escamosa', 'escamos'],
          ['En el esófago de Barrett, el epitelio escamoso se reemplaza por epitelio…', 'Cilíndrico simple || Cilíndrico || Columnar', 'cilindric|columnar'],
          ['Barrett resulta de la enfermedad crónica por…', 'Reflujo gastroesofágico || ERGE', 'reflujo|erge']
        ] }
      ]
    },
    {
      id: 'ap_pr_rep_p1', area: PR, clase: 'Práctica 1', titulo: 'Láminas de la práctica 1: cuadro de repaso', tipo: 'tabla', sl: [['p1', 19, 32], ['p1b', 15, 21]],
      resumen: 'Las cinco láminas de adaptación con el formato de la prueba: del órgano al diagnóstico.',
      fuente: 'Práctica 1 · Descripciones de las láminas "a trabajar hoy" (partes 1 y 2)',
      columnas: ['Órgano', 'Proceso', 'Alteraciones', 'Dx'],
      filas: [
        ['Próstata', '[[Adaptativo::adaptativ]] / inflamatorio crónico', 'Proliferación de glándulas benignas; dilataciones glandulares, invaginaciones papilares y áreas quísticas con [[cuerpos amiláceos::amilace]]; infiltrado inflamatorio crónico sobreagregado', '[[Hiperplasia prostática benigna || HPB::hiperplasia|hpb]] y prostatitis crónica'],
        ['Glándula tiroides', 'Adaptativo', 'Folículos [[dilatados::dilatad]] de tamaño variable, aplanados en sectores e hiperplásicos en otros; áreas de hemorragia', '[[Bocio coloide multinodular::bocio]]'],
        ['Corazón', 'Adaptativo', 'Cardiomiocitos hipertróficos, ramificados, con núcleos hipercromáticos y agrandados; fibrosis cicatricial y pigmentos de [[lipofucsina::lipofuc]]', '[[Hipertrofia cardíaca::hipertrofia]]'],
        ['Testículo', 'Adaptativo', 'Desaparición del epitelio tubular, túbulos pequeños y escleróticos, fibrosis intersticial y aumento de células de [[Leydig::leydig]]', '[[Atrofia testicular::atrofia]]'],
        ['Esófago', 'Adaptación celular ([[metaplasia::metaplasia]])', 'Epitelio escamoso reemplazado por epitelio cilíndrico simple con microvellosidades y células [[caliciformes::calicifor]]', '[[Esófago de Barret || Esófago de Barrett::barret]]']
      ]
    }
  ];
  var TEO_P2 = [
    {
      id: 'ap_pr_lesion', area: PR, clase: 'Práctica 2', titulo: 'Lesión celular y formas de necrosis', tipo: 'mapa', sl: [['p2', 2, 25]],
      centro: 'Lesión celular', sub: 'Necrosis: cómo se ve y qué formas tiene',
      fuente: 'Práctica 2 · Lesión celular, morfología de la necrosis, formas de necrosis, caseosa y grasa',
      ramas: [
        { t: 'Concepto', hojas: [
          ['Estrés tan intenso que la célula ya no es capaz de…', 'Adaptarse', 'adapt'],
          ['La otra forma de muerte celular, además de la necrosis', 'Apoptosis', 'apoptosis']
        ] },
        { t: 'Morfología', hojas: [
          ['Cambio de color del citoplasma', 'Eosinofilia aumentada', 'eosinofil'],
          ['Estructuras que aparecen en la célula necrótica', 'Figuras de mielina', 'mielina'],
          ['La basofilia de la cromatina se desvanece', 'Cariólisis', 'cariolisis'],
          ['Encogimiento nuclear', 'Picnosis', 'picnosis'],
          ['Fragmentación del núcleo', 'Cariorrexis', 'cariorrexis']
        ] },
        { t: 'Formas', hojas: [
          ['Hemorrágica o isquémica', 'Coagulativa', 'coagul'],
          ['O de licuefacción', 'Colicuativa', 'colicuativ'],
          ['Enzimática o traumática', 'Grasa', 'grasa'],
          ['Seca o húmeda', 'Gangrenosa', 'gangren']
        ] },
        { t: 'Infartos', hojas: [
          ['Necrosis coagulativa hemorrágica', 'Infarto rojo', 'rojo'],
          ['Necrosis coagulativa isquémica', 'Infarto blanco', 'blanco']
        ] },
        { t: 'Caseosa y grasa', hojas: [
          ['Infección donde aparece la caseosa', 'Tuberculosis', 'tuberculo'],
          ['Reborde inflamatorio que rodea el foco caseoso', 'Reacción granulomatosa', 'granulomat'],
          ['A diferencia de la coagulativa, la arquitectura queda…', 'Completamente alterada || Alterada', 'alterad'],
          ['La grasa la causan enzimas…', 'Pancreáticas', 'pancrea']
        ] }
      ]
    },
    {
      id: 'ap_pr_rep_p2', area: PR, clase: 'Práctica 2', titulo: 'Láminas de la práctica 2: cuadro de repaso', tipo: 'tabla', sl: [['p2', 26, 30]],
      resumen: 'Necrosis coagulativa isquémica y necrosis caseosa, con el formato de la prueba.',
      fuente: 'Práctica 2 · Descripciones de las láminas "para hoy"',
      columnas: ['Órgano', 'Proceso', 'Alteraciones', 'Dx'],
      filas: [
        ['Corazón', 'Necrosis [[coagulativa isquémica || coagulativa::coagul]]', 'Cardiomiocitos [[anucleados::anuclead]] por cariólisis, infiltrado de neutrófilos y áreas de hemorragia', '[[Infarto agudo de miocardio || IAM::infarto|iam]]'],
        ['Ovario', 'Inflamatorio crónico [[granulomatoso::granulomat]] / necrosis caseosa', 'Linfocitos, células epitelioides, plasmáticas, fibroblastos, células gigantes multinucleadas de tipo [[Langhans::langhans]] y necrosis caseosa', '[[Tuberculosis::tuberculo]]']
      ]
    }
  ];
  var TEO_P3 = [
    {
      id: 'ap_pr_acumulos', area: PR, clase: 'Práctica 3', titulo: 'Acúmulos intracelulares y melanoma', tipo: 'mapa', sl: [['p3', 3, 14], ['p3', 19, 25]],
      centro: 'Acúmulos intracelulares', sub: 'Qué se acumula, dónde y el melanoma',
      fuente: 'Práctica 3 · Categorías de acúmulos, lípidos, aterosclerosis, colesterolosis y melanoma',
      ramas: [
        { t: 'Categorías', hojas: [
          ['Agua, lípidos, proteínas o hidratos de carbono en exceso', 'Constituyente celular normal || Un constituyente celular normal', 'constituyente|normal'],
          ['Sustancia anormal, producto de síntesis o metabolismo anormal', 'Endógena', 'endogen'],
          ['Sustancia anormal: minerales o productos de agentes infecciosos', 'Exógena', 'exogen'],
          ['La tercera categoría', 'Pigmento || Un pigmento', 'pigment']
        ] },
        { t: 'Lípidos', hojas: [
          ['Cambio graso del hígado: acúmulo de…', 'Triglicéridos', 'triglicer'],
          ['En la placa, se cargan de colesterol las células musculares lisas y los…', 'Macrófagos', 'macrofag'],
          ['Apariencia de esas células cargadas de lípidos', 'Espumosa', 'espumos'],
          ['Macrófagos con colesterol en la lámina propia de la vesícula biliar', 'Colesterolosis', 'colesterolosis']
        ] },
        { t: 'Melanoma', hojas: [
          ['Tumor maligno del…', 'Melanocito', 'melanocit'],
          ['Proporción que surge de novo, sobre piel sana', '80% || 80 %', '80'],
          ['Primero crece en superficie (horizontal) y luego…', 'En profundidad || Vertical', 'vertical|profundidad'],
          ['Topografía más habitual en el varón', 'Espalda || La espalda', 'espalda']
        ] },
        { t: 'Signos de aviso', hojas: [
          ['Del lunar preexistente: aumento de…', 'Tamaño', 'tamano'],
          ['Del lunar preexistente: prurito o…', 'Dolor', 'dolor'],
          ['Bordes de la lesión pigmentada', 'Irregulares', 'irregular'],
          ['Colores en el interior de la lesión', 'Abigarrados', 'abigarrad|abirragad']
        ] }
      ]
    },
    {
      id: 'ap_pr_rep_p3', area: PR, clase: 'Práctica 3', titulo: 'Láminas de la práctica 3: cuadro de repaso', tipo: 'tabla', sl: [['p3', 15, 18]],
      resumen: 'Las cuatro láminas de acúmulos intracelulares con el formato de la prueba.',
      fuente: 'Práctica 3 · Descripciones de las láminas de aterosclerosis, colesterolosis, esteatosis y melanoma',
      columnas: ['Órgano', 'Proceso', 'Alteraciones', 'Dx'],
      filas: [
        ['Vaso sanguíneo', 'Acúmulos intracelulares', 'Hendiduras de [[colesterol::colesterol]], macrófagos espumosos cargados de lípidos y calcificación [[distrófica::distrof]]', '[[Aterosclerosis::ateroscl]]'],
        ['Vesícula biliar', 'Acúmulos intracelulares', 'Macrófagos [[espumosos::espumos]] cargados de colesterol en la lámina propia', '[[Colesterolosis::colesterolosis]]'],
        ['Hígado', 'Acúmulos intracelulares', 'Histoarquitectura alterada por hepatocitos con vacuolas lipídicas ([[triglicéridos::triglicer]])', '[[Esteatosis hepática::esteatosis]]'],
        ['Piel', 'Acúmulos intracelulares', 'Epidermis con acantosis y papilomatosis; en la dermis, células atípicas y pigmento de [[melanina::melanina]]', '[[Melanoma::melanoma]]']
      ]
    }
  ];
  var TEO_P4 = [
    {
      id: 'ap_pr_inflamacion', area: PR, clase: 'Práctica 4', titulo: 'Inflamación aguda y crónica', tipo: 'tabla', sl: [['p4', 3, 4]],
      resumen: 'La tabla de características que muestra la clase, más lo que define a la crónica.',
      fuente: 'Práctica 4 · Inflamación crónica y tabla "Características de la inflamación aguda y crónica"',
      columnas: ['', 'Aguda', 'Crónica'],
      filas: [
        ['Aparición', 'Rápida: [[minutos a horas::minuto;hora]]', 'Lenta: [[días::dia]]; de duración prolongada (semanas y meses)'],
        ['Infiltrado celular', 'Principalmente [[neutrófilos::neutrof]]', '[[Monocitos/macrófagos y linfocitos || Macrófagos y linfocitos::macrof;linfoc]]'],
        ['Lesión tisular y fibrosis', 'Suele ser [[leve y autolimitada || leve::leve]]', 'Suele ser [[grave y progresiva || grave::grave]]'],
        ['Signos locales y sistémicos', '[[Prominentes::prominent]]', 'Menos prominentes; pueden ser [[sutiles::sutil]]'],
        ['Qué ocurre a la vez', 'No figura en la tabla', 'Inflamación activa, destrucción tisular e intentos de [[reparación::reparaci]]']
      ]
    },
    {
      id: 'ap_pr_apendice_capas', area: PR, clase: 'Pizarrón 30/09', titulo: 'Apendicitis aguda: qué buscar en cada capa', tipo: 'mapa',
      centro: 'Apendicitis aguda', sub: 'Lo que la profesora marcó en el corte del apéndice',
      fuente: 'Pizarrón de la Dra. Alicia Gonzalez, práctica del 30/09 (foto de la pasta LAMINÁRIO)',
      ramas: [
        { t: 'Mucosa', hojas: [
          ['Glándulas tubulares de la mucosa: criptas de…', 'Lieberkühn', 'lieberk'],
          ['Células de las criptas que absorben electrolitos y agua', 'Enterocitos', 'enterocit'],
          ['Células de las criptas que liberan moco', 'Caliciformes || Células caliciformes', 'calicifor'],
          ['Lesiones de la mucosa: erosión y…', 'Ulceración', 'ulceraci']
        ] },
        { t: 'Submucosa', hojas: [
          ['Lo que se ve en la submucosa', 'Nódulos linfoides', 'nodulo|linfoide']
        ] },
        { t: 'Muscular', hojas: [
          ['Células inflamatorias en la muscular', 'Neutrófilos', 'neutrof']
        ] },
        { t: 'Serosa', hojas: [
          ['Vasos… y edema en la serosa', 'Hiperemiados', 'hiperemi']
        ] },
        { t: 'Además', hojas: [
          ['Sangre fuera de los vasos', 'Hemorragia', 'hemorragi'],
          ['Muerte del tejido', 'Necrosis', 'necrosis']
        ] }
      ]
    },
    {
      id: 'ap_pr_apendice_pato', area: PR, clase: 'Pizarrón 30/09', titulo: 'Apendicitis aguda: patogenia', tipo: 'fluxo',
      resumen: 'La cadena que la profesora dibujó: de la obstrucción a la perforación.',
      fuente: 'Pizarrón de la Dra. Alicia Gonzalez, práctica del 30/09 (foto de la pasta LAMINÁRIO)',
      pasos: [
        'Principal etiología: obstrucción por [[fecalito::fecalit]]',
        'Por la obstrucción aumenta el [[moco::moco|muco]]',
        'Aumenta la [[presión en la luz || presión::presion]]',
        'Se comprimen las [[vénulas y capilares || vénulas::venula|capilar]], que tienen la pared más fina',
        'Las vénulas se congestionan (sangre parada) y hay [[edema::edema]]',
        'Llega un punto en que también se comprimen las [[arteriolas::arteriol]]',
        'No llega sangre ni oxígeno: [[isquemia::isquemia]]',
        'La isquemia lleva a la [[necrosis::necrosis]]',
        { end: 'La necrosis termina en [[perforación::perforaci]]' }
      ]
    },
    {
      id: 'ap_pr_rep_p4', area: PR, clase: 'Práctica 4', titulo: 'Láminas de la práctica 4: cuadro de repaso', tipo: 'tabla', sl: [['p4', 5, 25]],
      resumen: 'Las cuatro láminas de inflamación crónica con el formato de la prueba.',
      fuente: 'Práctica 4 · Tiroiditis de Hashimoto, pielonefritis crónica, colecistitis crónica y cirrosis',
      columnas: ['Órgano', 'Proceso', 'Alteraciones', 'Dx'],
      filas: [
        ['Glándula tiroides', 'Inflamatorio crónico', 'Formación de centros [[germinales::germinal]], folículos tiroideos atróficos y residuales, áreas de fibrosis', '[[Tiroiditis de Hashimoto::hashimoto]]'],
        ['Riñón', 'Inflamatorio crónico', 'Inflamación tubulointersticial con atrofia tubular, llamada [[tiroidización::tiroidiz]], y áreas de fibrosis', '[[Pielonefritis crónica::pielonefritis]]'],
        ['Vesícula biliar', 'Inflamación crónica y acúmulos intracelulares', 'Linfocitos aislados y en nidos, hipertrofia de la muscular con senos de [[Rokitansky-Aschoff::rokitansky|aschoff]] y macrófagos espumosos en la lámina propia', '[[Colecistitis crónica / colesterolosis || Colecistitis crónica::colecistitis]]'],
        ['Hígado', 'Inflamatorio crónico y acúmulos intracelulares', 'Nódulos [[regenerativos::regenerativ]] separados por tabiques de tejido conectivo, hepatocitos con vacuolas lipídicas e infiltrado crónico', '[[Cirrosis hepática / esteatosis hepática || Cirrosis hepática::cirrosis]]']
      ]
    }
  ];
  var TEO_CASOS = [
    {
      id: 'ap_pr_que_lamina', area: PR, clase: 'Prácticas 1 a 4', titulo: '¿Qué lámina es? Alteración clave', tipo: 'casos',
      sl: [['p1', 19, 32], ['p1b', 15, 21], ['p2', 26, 30], ['p3', 15, 18], ['p4', 5, 25]],
      resumen: 'Leé la alteración que describe la profesora y elegí el diagnóstico.',
      fuente: 'Descripciones de las láminas de las prácticas 1 a 4 (Dra. Alicia Gonzalez)',
      casos: [
        ['Próstata: glándulas benignas proliferadas, áreas quísticas con cuerpos amiláceos.', '¿Diagnóstico?', 'a) Hiperplasia prostática benigna', 'a', 'Proceso adaptativo; la clase agrega prostatitis crónica por el infiltrado sobreagregado.',
         ['a) Hiperplasia prostática benigna', 'b) Atrofia testicular', 'c) Tuberculosis', 'd) Melanoma']],
        ['Testículo: túbulos pequeños y escleróticos, fibrosis intersticial y aumento de células de Leydig.', '¿Diagnóstico?', 'c) Atrofia testicular', 'c', 'Desaparece el epitelio tubular.',
         ['a) Hipertrofia cardíaca', 'b) Bocio coloide multinodular', 'c) Atrofia testicular', 'd) Pielonefritis crónica']],
        ['Esófago: epitelio escamoso reemplazado por epitelio cilíndrico simple con células caliciformes.', '¿Diagnóstico y proceso?', 'b) Esófago de Barrett, metaplasia', 'b', 'Es la metaplasia que resulta del reflujo gastroesofágico crónico.',
         ['a) Esófago de Barrett, hiperplasia', 'b) Esófago de Barrett, metaplasia', 'c) Apendicitis aguda', 'd) Colesterolosis']],
        ['Corazón: cardiomiocitos agrandados y ramificados, con núcleos hipercromáticos y lipofucsina.', '¿Diagnóstico?', 'd) Hipertrofia cardíaca', 'd', 'Los cardiomiocitos no se dividen: responden con hipertrofia.',
         ['a) Infarto agudo de miocardio', 'b) Aterosclerosis', 'c) Hiperplasia', 'd) Hipertrofia cardíaca']],
        ['Corazón: cardiomiocitos anucleados por cariólisis, neutrófilos y hemorragia.', '¿Diagnóstico?', 'a) Infarto agudo de miocardio', 'a', 'Necrosis coagulativa isquémica.',
         ['a) Infarto agudo de miocardio', 'b) Hipertrofia cardíaca', 'c) Melanoma', 'd) Tiroiditis de Hashimoto']],
        ['Ovario: células gigantes multinucleadas de tipo Langhans, células epitelioides y necrosis caseosa.', '¿Diagnóstico?', 'b) Tuberculosis', 'b', 'Proceso inflamatorio crónico granulomatoso con necrosis caseosa.',
         ['a) Melanoma', 'b) Tuberculosis', 'c) Esteatosis', 'd) Colesterolosis']],
        ['Vaso sanguíneo: hendiduras de colesterol, macrófagos espumosos y calcificación distrófica.', '¿Diagnóstico?', 'c) Aterosclerosis', 'c', 'Acúmulos intracelulares en la íntima de la arteria.',
         ['a) Colesterolosis', 'b) Infarto blanco', 'c) Aterosclerosis', 'd) Esteatosis hepática']],
        ['Hígado: nódulos regenerativos separados por tabiques de tejido conectivo.', '¿Diagnóstico?', 'd) Cirrosis hepática', 'd', 'La clase la describe con esteatosis e infiltrado crónico sobreagregado.',
         ['a) Esteatosis hepática pura', 'b) Necrosis grasa', 'c) Tiroiditis de Hashimoto', 'd) Cirrosis hepática']],
        ['Riñón: inflamación tubulointersticial con atrofia tubular de aspecto tiroideo.', '¿Diagnóstico?', 'a) Pielonefritis crónica', 'a', 'Esa atrofia tubular se llama "tiroidización".',
         ['a) Pielonefritis crónica', 'b) Tiroiditis de Hashimoto', 'c) Bocio coloide', 'd) Infarto renal']],
        ['Tiroides: centros germinales, folículos atróficos y residuales, fibrosis.', '¿Diagnóstico?', 'c) Tiroiditis de Hashimoto', 'c', 'Proceso inflamatorio crónico; el bocio coloide, en cambio, tiene folículos dilatados.',
         ['a) Bocio coloide multinodular', 'b) Hiperplasia folicular', 'c) Tiroiditis de Hashimoto', 'd) Pielonefritis crónica']],
        ['Vesícula biliar: senos de Rokitansky-Aschoff, linfocitos en nidos y macrófagos espumosos en la lámina propia.', '¿Diagnóstico?', 'b) Colecistitis crónica con colesterolosis', 'b', 'Inflamación crónica y acúmulos intracelulares en la misma lámina.',
         ['a) Apendicitis aguda', 'b) Colecistitis crónica con colesterolosis', 'c) Aterosclerosis', 'd) Esteatosis']],
        ['Piel: acantosis y papilomatosis; en la dermis, células atípicas y pigmento de melanina.', '¿Diagnóstico?', 'd) Melanoma', 'd', 'Tumor maligno del melanocito.',
         ['a) Tuberculosis', 'b) Colesterolosis', 'c) Hiperplasia', 'd) Melanoma']]
      ]
    }
  ];

  A.docentePratica = 'Dra. Alicia Gonzalez';
  A.fontePratica = 'Clases prácticas 1 a 4, láminas de la P1 y de la P2, laminario completo y pizarrones';
  [].push.apply(A.modulos, [].concat(
    TEO_P1,
    par('lam_p1', 'Práctica · P1', 'Láminas de la P1',
      'Las 5 láminas que la profesora indicó para la prueba. Mirá las fotos y completá ÓRGANO, PROCESO, DESCRIPCIÓN y DX, con banco de palabras.',
      'Las mismas 5 láminas en orden aleatorio, sin banco de palabras y sin decir cuántas alteraciones hay.', SRC_P + '; lista «Láminas p/ prova» del pizarrón', P1),
    TEO_P2, TEO_P3, TEO_P4,
    par('lam_p2', 'Práctica · P2', 'Láminas de la P2',
      'Los 10 temas del pizarrón de la P2 (necrosis, inflamación, acúmulos y cirrosis), con la descripción de la profesora como respuesta.',
      'Las 10 láminas de la P2 en orden aleatorio, sin banco de palabras.', SRC_P + '; pizarrón «Temas P2 Práctica»; Hashimoto y cirrosis: tabla del laminario', P2Q),
    par('lam_total', 'Laminario', 'Laminario completo (28 láminas)',
      'La tabla corregida del laminario (25 láminas) más 3 láminas nuevas de duodeno y estómago de la prueba práctica oficial, en orden, con la foto de cada lámina. Seis láminas tienen una segunda foto oficial, también tomada de la prueba.',
      'Las 28 láminas del laminario en orden aleatorio, sin banco de palabras.', SRC_T + '; 3 láminas y 6 fotos extra: PDF oficial «Laminas Anatopato I - Practica P1_P2_Final»', TOTAL),
    [{ id: 'lam_simulacro', area: 'pratica', tipo: 'laminas', nivel: '3', sorteo: 8, cronometro: true, clase: 'Simulacro', titulo: 'Simulacro de la prueba práctica',
      resumen: 'Ocho láminas sorteadas entre la P1, la P2 y el laminario. Sin banco de palabras y con cronómetro; la planilla sale al final.',
      fuente: 'Láminas de la P1, de la P2 y del laminario completo', laminas: uniq(P1.concat(P2Q, TOTAL)), procesos: PROCESOS }],
    TEO_CASOS
  ));
})();
