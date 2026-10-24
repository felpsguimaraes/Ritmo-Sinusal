/* Sinus · Mapas guiados · Anatomía Patológica I · PRÁCTICA (láminas)
   Na prova prática a professora pede, para cada lâmina: ÓRGANO · PROCESO · DESCRIPCIÓN (alteraciones) · DX.
   Fontes:
   - Láminas de la P1 e da P2: descrições projetadas pela Dra. Alicia Gonzalez nas aulas práticas
     (fotos "descrição da lámina" da pasta LAMINÁRIO do Drive da turma).
   - Temas da P2 prática: quadro "Temas P2 Práctica" (foto "Conteúdo P2" da pasta LAMINÁRIO P2).
   - Laminario completo: tabela "LAMINARIOS TOTAL CORRIGIDO" (25 láminas), com as fotos recortadas
     sem a etiqueta e sem os rótulos que entregavam a resposta.
   Fotos: { src } = arquivo do site; { drive } = foto pública da pasta LAMINÁRIO da turma.
   k: pdf (laminario), prof (imagem que a professora mandou), turma (foto tirada no microscópio da aula).
   Cada lâmina: organo/proceso/dx = [resposta, chaves]; desc = [[achado, chaves], ...] (corrigida em texto livre).
   g = grupo: a mesma lâmina em duas listas não sai duas vezes no simulacro. */
(function () {
  var A = window.SINUS_MAPAS && window.SINUS_MAPAS.anatopato;
  if (!A) return;
  function L(n) { return { src: 'img/laminario/lam-' + (n < 10 ? '0' : '') + n + '.jpg', k: 'pdf' }; }
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
    vulva: ['Vulva', 'vulva']
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
      ['Tabiques de tejido conectivo con linfocitos', 'tabique|septo|linfocit']], ['Seminoma', 'seminom'])
  ];

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

  A.docentePratica = 'Dra. Alicia Gonzalez';
  A.fontePratica = 'Láminas de la P1 y de la P2, laminario completo y pizarrones de las clases prácticas';
  [].push.apply(A.modulos, [].concat(
    par('lam_p1', 'Práctica · P1', 'Láminas de la P1',
      'Las 5 láminas que la profesora indicó para la prueba. Mirá las fotos y completá ÓRGANO, PROCESO, DESCRIPCIÓN y DX, con banco de palabras.',
      'Las mismas 5 láminas en orden aleatorio, sin banco de palabras y sin decir cuántas alteraciones hay.', SRC_P + '; lista «Láminas p/ prova» del pizarrón', P1),
    par('lam_p2', 'Práctica · P2', 'Láminas de la P2',
      'Los 10 temas del pizarrón de la P2 (necrosis, inflamación, acúmulos y cirrosis), con la descripción de la profesora como respuesta.',
      'Las 10 láminas de la P2 en orden aleatorio, sin banco de palabras.', SRC_P + '; pizarrón «Temas P2 Práctica»; Hashimoto y cirrosis: tabla del laminario', P2Q),
    par('lam_total', 'Laminario', 'Laminario completo (25 láminas)',
      'La tabla corregida del laminario, en el orden de la tabla, con la foto de cada lámina.',
      'Las 25 láminas del laminario en orden aleatorio, sin banco de palabras.', SRC_T, TOTAL),
    [{ id: 'lam_simulacro', area: 'pratica', tipo: 'laminas', nivel: '3', sorteo: 8, cronometro: true, clase: 'Simulacro', titulo: 'Simulacro de la prueba práctica',
      resumen: 'Ocho láminas sorteadas entre la P1, la P2 y el laminario. Sin banco de palabras y con cronómetro; la planilla sale al final.',
      fuente: 'Láminas de la P1, de la P2 y del laminario completo', laminas: uniq(P1.concat(P2Q, TOTAL)), procesos: PROCESOS }]
  ));
})();
