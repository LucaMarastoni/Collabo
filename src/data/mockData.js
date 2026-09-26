const photo = (id, width = 1200) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;
export const images = {
 mountain: photo('photo-1464822759023-fed622ff2c3b'),
 architecture: photo('photo-1487958449943-2429e8be8625'),
 music: photo('photo-1516280440614-37939bbacd81'),
 desert: photo('photo-1509316785289-025f5b846b35'),
 city: photo('photo-1519608487953-e999c86e7455'),
 ocean: photo('photo-1518837695005-2083093ee35b'),
 forest: photo('photo-1448375240586-882707db888b'),
 coast: photo('photo-1473116763249-2faaef81ccda'),
 portrait: photo('photo-1534528741775-53994a69daeb'),
 sunrise: photo('photo-1500534623283-312aade485b7'),
 color: photo('photo-1549490349-8643362247b5'),
 paint: photo('photo-1513364776144-60967b0f800f'),
 fashion: photo('photo-1529139574466-a303027c1d8b'),
 minimal: photo('photo-1494438639946-1ebd1d20bf85'),
 library: photo('photo-1481627834876-b7833e8f5570'),
 screens: photo('photo-1545235617-9465d2a55698'),
 workspace: photo('photo-1515378791036-0648a3ef77b2'),
 gathering: photo('photo-1528605248644-14dd04022da1'),
 studioPortrait: photo('photo-1524504388940-b1c1722653e1'),
 collaboration: photo('photo-1519389950473-47ba0277781c'),
 craft: photo('photo-1452860606245-08befc0ff44b'),
 road: photo('photo-1500530855697-b586d89ba3ee'),
 interior: photo('photo-1524758631624-e2822e304c36'),
 workshop: photo('photo-1517245386807-bb43f82c33c4'),
 event: photo('photo-1531058020387-3be344556be6'),
 mural: photo('photo-1547891654-e66ed7ebb968'),
 ridge: photo('photo-1492691527719-9d1e07e534b4'),
 gradient: photo('photo-1618005182384-a83a8bd57fbe'),
 editing: photo('photo-1574717024653-61fd2cf4d44d'),
};
export const users = [
 { id: 'marco', name: 'Marco Rossi', username: 'marco.frames', profession: 'Videomaker', avatar: photo('photo-1500648767791-00dcc994a43e', 100) },
 { id: 'giulia', name: 'Giulia Bianchi', username: 'giulia.studio', profession: 'Fotografa', avatar: photo('photo-1494790108377-be9c29b29330', 100) },
 { id: 'andrea', name: 'Andrea Costa', username: 'andrea.wav', profession: 'Music producer', avatar: photo('photo-1506794778202-cad84cf45f1d', 100) },
 { id: 'sofia', name: 'Sofia Ricci', username: 'sofia.design', profession: 'UI/UX designer', avatar: photo('photo-1531123897727-8f129e1688ce', 100) },
 { id: 'davide', name: 'Davide Moretti', username: 'davide.builds', profession: 'Developer', avatar: photo('photo-1527980965255-d3b416303d12', 100) },
 { id: 'elena', name: 'Elena Ferri', username: 'elena.draws', profession: 'Illustratrice', avatar: photo('photo-1517841905240-472988babdf9', 100) },
 { id: 'nicolo', name: 'Nicolò Riva', username: 'nico.render', profession: '3D artist', avatar: photo('photo-1547425260-76bcadfb4f2c', 100) },
 { id: 'marta', name: 'Marta Greco', username: 'marta.styles', profession: 'Stylist e art director', avatar: photo('photo-1544005313-94ddf0286df2', 100) },
 { id: 'tommaso', name: 'Tommaso Villa', username: 'tommaso.type', profession: 'Brand designer', avatar: photo('photo-1535713875002-d1d0cf377fde', 100) },
 { id: 'alice', name: 'Alice Serra', username: 'alice.luce', profession: 'Fotografa di paesaggio', avatar: photo('photo-1524504388940-b1c1722653e1', 100) },
 { id: 'karim', name: 'Karim Haddad', username: 'karim.sound', profession: 'Sound designer', avatar: photo('photo-1507003211169-0a1dd7228f2d', 100) },
 { id: 'beatrice', name: 'Beatrice Neri', username: 'bea.spaces', profession: 'Architetta', avatar: photo('photo-1517365830460-955ce3ccd263', 100) },
 { id: 'filippo', name: 'Filippo Leone', username: 'filippo.codes', profession: 'Creative developer', avatar: photo('photo-1521119989659-a83eee488004', 100) },
 { id: 'chiara', name: 'Chiara Rinaldi', username: 'chiara.motion', profession: 'Videomaker', avatar: photo('photo-1524250502761-1ac6f2e30d43', 100) },
 { id: 'pietro', name: 'Pietro Sala', username: 'pietro.outdoors', profession: 'Fotografo outdoor', avatar: photo('photo-1560250097-0b93528c311a', 100) },
 { id: 'sara', name: 'Sara De Luca', username: 'sara.forms', profession: '3D e motion artist', avatar: photo('photo-1487412720507-e7ab37603c6f', 100) },
];
export const currentUser = { name: 'Luca', username: 'luca.visuals', profession: 'Videomaker', city: 'Milano, Italia', bio: 'Racconto storie attraverso immagini in movimento. Sempre alla ricerca di nuovi punti di vista e persone con cui creare.', portfolio: 'https://vimeo.com', avatar: photo('photo-1492562080023-ab3db95bfbce', 200) };
export const posts = [
 { id: 'p1', type: 'project', user: users[0], image: images.mountain, alt: 'Vette delle Dolomiti illuminate dalla luce del mattino', title: 'Documentario sulle Alpi italiane', description: 'Un corto tra le Dolomiti. Cerco un fonico, un colorist e un assistente di produzione per raccontare queste montagne.', tags: ['Videomaking', 'Color Grading', 'Sound Design', 'Produzione', 'Montaggio'], likes: 128, comments: 12, time: '2 ore fa', category: 'CORTOMETRAGGIO', location: 'Dolomiti, Italia', period: 'Ott – Nov 2026', remote: true, discovery: 'Video', gallery: [{ image: images.mountain, alt: 'Vette delle Dolomiti' }, { image: images.forest, alt: 'Bosco alpino' }, { image: images.coast, alt: 'Paesaggio d’acqua' }, { image: images.desert, alt: 'Studio di luce sul paesaggio' }] },
 { id: 'p2', type: 'portfolio', user: users[1], image: images.architecture, alt: 'Architettura bianca dalle linee geometriche sotto un cielo azzurro', title: 'La forma del silenzio', description: 'Luce, geometrie e spazi da abitare. Una selezione dal mio ultimo progetto di fotografia architettonica.', tags: ['Fotografia', 'Architettura', 'Editoriale'], likes: 246, comments: 18, time: '4 ore fa', category: 'VISUAL DIARY / 024', location: 'Milano, Italia', discovery: 'Foto', gallery: [{ image: images.architecture, alt: 'Architettura e geometrie' }, { image: images.city, alt: 'Profilo urbano di notte' }, { image: images.portrait, alt: 'Ritratto in luce naturale' }] },
 { id: 'p3', type: 'project', user: users[2], image: images.music, alt: 'Microfono in uno studio musicale', title: 'Suoni fuori orario', description: 'Sto producendo un EP elettronico ispirato alla città di notte. Cerco una voce e un visual artist per costruire un mondo insieme.', tags: ['Vocalist', 'Visual artist'], likes: 87, comments: 6, time: '5 ore fa', category: 'INDIPENDENT MUSIC', location: 'Bologna, Italia', period: 'Nov – Dic 2026', remote: true, discovery: 'Musica', gallery: [{ image: images.music, alt: 'Microfono in studio' }, { image: images.city, alt: 'La città di notte' }] },
 { id: 'p4', type: 'portfolio', user: users[3], image: images.desert, alt: 'Dune di sabbia dorata nel deserto', title: 'Dune — un viaggio essenziale', description: 'Direzione visiva e UI per un magazine di viaggi lenti. Un linguaggio essenziale che lascia parlare i luoghi.', tags: ['UI/UX', 'Art direction', 'Web design'], likes: 193, comments: 9, time: '7 ore fa', category: 'DIGITAL EXPERIENCE', location: 'Torino, Italia', discovery: 'Design', gallery: [{ image: images.desert, alt: 'Dune di sabbia' }, { image: images.coast, alt: 'Costa al tramonto' }, { image: images.architecture, alt: 'Studio di layout' }] },
 { id: 'p5', type: 'project', user: users[4], image: images.city, alt: 'Cielo notturno sopra la città', title: 'La città, a modo nostro', description: 'Una mappa interattiva dei piccoli spazi culturali indipendenti. Il codice c’è: cerco chi mi aiuti a raccontarli con una nuova identità.', tags: ['UI designer', 'Illustratore'], likes: 64, comments: 7, time: '9 ore fa', category: 'SIDE PROJECT', location: 'Roma, Italia', period: 'Ott 2026', remote: false, discovery: 'Design', gallery: [{ image: images.city, alt: 'Cielo sopra la città' }, { image: images.architecture, alt: 'Spazi culturali' }] },
 { id: 'p6', type: 'portfolio', user: users[6], image: images.ocean, alt: 'Onde dell’oceano e riflessi sulla superficie', title: 'Studi di superficie', description: 'L’oceano come riferimento per una ricerca su materiali, luce e movimento. Appunti visivi per la mia prossima serie 3D.', tags: ['3D art', 'Ricerca visiva', 'Motion'], likes: 312, comments: 21, time: 'Ieri', category: 'TEXTURE STUDIES', location: 'Firenze, Italia', discovery: '3D', gallery: [{ image: images.ocean, alt: 'Onde dell’oceano' }, { image: images.forest, alt: 'Texture di bosco' }] },
 { id: 'p7', type: 'portfolio', user: users[5], image: images.paint, alt: 'Pennelli e colori su un tavolo di lavoro', title: 'Segni in movimento', description: 'Una raccolta di illustrazioni nate da gesti spontanei, colori accesi e piccoli errori felici.', tags: ['Illustrazione', 'Editoriale', 'Colore'], likes: 174, comments: 11, time: 'Ieri', category: 'ILLUSTRATION SERIES', location: 'Bologna, Italia', discovery: 'Design', gallery: [{ image: images.paint, alt: 'Pennelli e colori' }, { image: images.mural, alt: 'Murale illustrato' }, { image: images.craft, alt: 'Materiali creativi sul tavolo' }] },
 { id: 'p8', type: 'portfolio', user: users[7], image: images.fashion, alt: 'Modella in abiti rossi contro uno sfondo turchese', title: 'Forma libera', description: 'Styling e direzione artistica per un editoriale che gioca con silhouette, movimento e contrasti.', tags: ['Styling', 'Art direction', 'Editoriale'], likes: 228, comments: 16, time: 'Ieri', category: 'FASHION EDITORIAL', location: 'Milano, Italia', discovery: 'Design', gallery: [{ image: images.fashion, alt: 'Editoriale moda in rosso' }, { image: images.studioPortrait, alt: 'Ritratto in studio' }, { image: images.color, alt: 'Studio astratto di colore' }] },
 { id: 'p9', type: 'project', user: users[8], image: images.craft, alt: 'Materiali per progettare disposti su un tavolo', title: 'Un’identità per il quartiere', description: 'Stiamo creando l’identità visiva di un festival di quartiere. Cerco un illustratore e una fotografa per raccontarlo insieme.', tags: ['Branding', 'Illustrazione', 'Fotografia'], likes: 93, comments: 8, time: '2 giorni fa', category: 'IDENTITÀ VISIVA', location: 'Torino, Italia', period: 'Nov 2026', remote: true, discovery: 'Design', gallery: [{ image: images.craft, alt: 'Materiali per il progetto' }, { image: images.mural, alt: 'Arte urbana nel quartiere' }, { image: images.gathering, alt: 'Persone riunite attorno a un tavolo' }] },
 { id: 'p10', type: 'portfolio', user: users[9], image: images.sunrise, alt: 'Sole che sorge sopra un paesaggio montano', title: 'Prima che arrivi il giorno', description: 'Paesaggi fotografati all’alba, quando le città dormono e la luce cambia ogni minuto.', tags: ['Fotografia', 'Paesaggio', 'Luce naturale'], likes: 287, comments: 24, time: '2 giorni fa', category: 'LANDSCAPE JOURNAL', location: 'Trento, Italia', discovery: 'Foto', gallery: [{ image: images.sunrise, alt: 'Alba sulle montagne' }, { image: images.road, alt: 'Strada tra rocce rosse' }, { image: images.coast, alt: 'Luce calda sulla costa' }, { image: images.forest, alt: 'Sentiero nel bosco' }] },
 { id: 'p11', type: 'project', user: users[10], image: images.event, alt: 'Pubblico durante un evento in uno spazio industriale', title: 'Voci della città', description: 'Un archivio sonoro delle storie di chi vive la città. Cerco voci, un montatore audio e qualcuno per la parte visiva.', tags: ['Sound Design', 'Podcast', 'Visual artist'], likes: 116, comments: 13, time: '2 giorni fa', category: 'AUDIO DOCUMENTARY', location: 'Milano, Italia', period: 'Ott – Dic 2026', remote: true, discovery: 'Musica', gallery: [{ image: images.event, alt: 'Evento collettivo' }, { image: images.city, alt: 'Città di notte' }, { image: images.music, alt: 'Microfono per le registrazioni' }] },
 { id: 'p12', type: 'portfolio', user: users[11], image: images.interior, alt: 'Interno luminoso con sedute e grandi finestre', title: 'Spazi da vivere', description: 'Interni flessibili e accoglienti pensati per incontrarsi, lavorare e fermarsi un momento.', tags: ['Architettura', 'Interior design', 'Spazi condivisi'], likes: 204, comments: 14, time: '3 giorni fa', category: 'INTERIOR STUDIES', location: 'Venezia, Italia', discovery: 'Design', gallery: [{ image: images.interior, alt: 'Interno luminoso' }, { image: images.minimal, alt: 'Parete e lampada essenziali' }, { image: images.architecture, alt: 'Architettura dalle linee geometriche' }] },
 { id: 'p13', type: 'project', user: users[12], image: images.collaboration, alt: 'Team creativo al lavoro intorno a un tavolo', title: 'Una casa digitale per i creativi', description: 'Un piccolo spazio online per condividere processi e bozze. Cerco una persona UX e un motion designer per il primo prototipo.', tags: ['Sviluppo', 'UX/UI', 'Motion'], likes: 78, comments: 5, time: '3 giorni fa', category: 'CREATIVE TECH', location: 'Padova, Italia', period: 'Nov – Dic 2026', remote: true, discovery: 'Design', gallery: [{ image: images.collaboration, alt: 'Team al lavoro' }, { image: images.screens, alt: 'Schermate su un tablet' }, { image: images.workspace, alt: 'Postazione di lavoro' }] },
 { id: 'p14', type: 'portfolio', user: users[0], image: images.road, alt: 'Strada che attraversa un paesaggio di rocce rosse', title: 'Strade secondarie', description: 'Fotogrammi di un viaggio senza itinerario: strade vuote, orizzonti larghi e incontri inattesi.', tags: ['Videomaking', 'Travel', 'Color Grading'], likes: 156, comments: 10, time: '3 giorni fa', category: 'TRAVEL FILM', location: 'Sardegna, Italia', discovery: 'Video', gallery: [{ image: images.road, alt: 'Strada tra le rocce' }, { image: images.sunrise, alt: 'Luce dell’alba' }, { image: images.desert, alt: 'Dune al tramonto' }] },
 { id: 'p15', type: 'project', user: users[1], image: images.studioPortrait, alt: 'Ritratto fotografico in studio', title: 'Volti di casa', description: 'Una serie di ritratti e interviste alle persone del mio quartiere. Cerco chi possa curare le storie e il video.', tags: ['Fotografia', 'Interviste', 'Videomaking'], likes: 139, comments: 17, time: '4 giorni fa', category: 'RITRATTI E STORIE', location: 'Milano, Italia', period: 'Nov 2026', remote: false, discovery: 'Foto', gallery: [{ image: images.studioPortrait, alt: 'Ritratto in studio' }, { image: images.portrait, alt: 'Ritratto in luce naturale' }, { image: images.gathering, alt: 'Persone attorno a un tavolo' }] },
 { id: 'p16', type: 'project', user: users[3], image: images.screens, alt: 'Schermate di un progetto digitale su un tablet', title: 'Piccoli musei, grandi storie', description: 'Una guida digitale per scoprire musei indipendenti. Cerco un copywriter e uno sviluppatore frontend.', tags: ['UX/UI', 'Copywriting', 'Sviluppo'], likes: 102, comments: 9, time: '4 giorni fa', category: 'DIGITAL CULTURE', location: 'Torino, Italia', period: 'Ott – Nov 2026', remote: true, discovery: 'Design', gallery: [{ image: images.screens, alt: 'Interfaccia su un tablet' }, { image: images.library, alt: 'Scaffali di libri' }, { image: images.interior, alt: 'Spazio culturale luminoso' }] },
 { id: 'p17', type: 'project', user: users[6], image: images.color, alt: 'Forme astratte con riflessi viola e rosa', title: 'Materia immaginaria', description: 'Sto creando una serie di ambienti 3D ispirati a materiali impossibili. Cerco un compositore per dare loro una voce.', tags: ['3D art', 'Sound Design', 'Motion'], likes: 188, comments: 12, time: '5 giorni fa', category: '3D EXPERIMENT', location: 'Firenze, Italia', period: 'Dic 2026', remote: true, discovery: '3D', gallery: [{ image: images.color, alt: 'Materia astratta colorata' }, { image: images.ocean, alt: 'Superficie d’acqua' }, { image: images.mural, alt: 'Trame e colori illustrati' }] },
 { id: 'p18', type: 'portfolio', user: users[2], image: images.workshop, alt: 'Persone riunite per un laboratorio creativo', title: 'In ascolto', description: 'Appunti visivi e sonori da sessioni collettive: ritmo, conversazioni e idee ancora aperte.', tags: ['Produzione musicale', 'Live session', 'Collaborazione'], likes: 121, comments: 7, time: '5 giorni fa', category: 'LIVE SESSIONS', location: 'Bologna, Italia', discovery: 'Musica', gallery: [{ image: images.workshop, alt: 'Laboratorio creativo' }, { image: images.music, alt: 'Microfono in studio' }, { image: images.gathering, alt: 'Tavolo condiviso' }] },
 { id: 'p19', type: 'project', user: users[13], image: images.editing, alt: 'Timeline di montaggio video su uno schermo', title: 'Un minuto di città', description: 'Una serie di microfilm sui luoghi che attraversiamo ogni giorno. Cerco una voce narrante e un compositore.', tags: ['Videomaking', 'Voice over', 'Musica'], likes: 112, comments: 8, time: '5 giorni fa', category: 'MICRO DOCUMENTARY', location: 'Napoli, Italia', period: 'Nov – Dic 2026', remote: true, discovery: 'Video', gallery: [{ image: images.editing, alt: 'Montaggio video in corso' }, { image: images.city, alt: 'La città di notte' }, { image: images.event, alt: 'Persone riunite in uno spazio' }] },
 { id: 'p20', type: 'portfolio', user: users[14], image: images.ridge, alt: 'Escursionista su una cresta montana tra le nuvole', title: 'Oltre il sentiero', description: 'Una serie fotografica dedicata ai paesaggi attraversati a piedi e alle persone che li abitano.', tags: ['Fotografia', 'Outdoor', 'Paesaggio'], likes: 243, comments: 19, time: '6 giorni fa', category: 'OUTDOOR STORIES', location: 'Aosta, Italia', discovery: 'Foto', gallery: [{ image: images.ridge, alt: 'Creste montane tra le nuvole' }, { image: images.mountain, alt: 'Vette rocciose' }, { image: images.forest, alt: 'Bosco montano' }, { image: images.sunrise, alt: 'Alba sulle montagne' }] },
 { id: 'p21', type: 'portfolio', user: users[15], image: images.gradient, alt: 'Forme fluide viola, rosa e azzurre', title: 'Geografie morbide', description: 'Forme digitali che cambiano con la luce: esplorazioni tra modellazione 3D e movimento.', tags: ['3D art', 'Motion', 'Digital sculpture'], likes: 197, comments: 15, time: '6 giorni fa', category: 'DIGITAL FORMS', location: 'Genova, Italia', discovery: '3D', gallery: [{ image: images.gradient, alt: 'Forme digitali colorate' }, { image: images.color, alt: 'Superficie fluida viola' }, { image: images.ocean, alt: 'Riflessi sull’acqua' }] },
];
export const creators = users.map(user => ({ ...user, posts: posts.filter(post => post.user.id === user.id) })).filter(user => user.posts.length);
const conversationSeeds = [
 ['12:42', 2, 'Ciao Luca! Ho visto il tuo ultimo video, mi piace molto la fotografia.', 'Ti va di parlarne davanti a un caffè? ☕'],
 ['11:18', 1, 'Ciao Luca! Ti va di lavorare insieme a un editoriale?', 'Ti ho mandato la moodboard, fammi sapere!'],
 ['10:05', 0, 'Ho ascoltato il riferimento che mi hai mandato. Bellissima atmosfera.', 'Perfetto, ci sentiamo domani 🎧'],
 ['Ieri', 0, 'Ti mando una prima proposta per il sito del portfolio.', 'Che ne pensi di questa direzione?'],
 ['Ieri', 0, 'La prima versione del progetto è pronta per essere vista.', 'Appena hai un momento, ci confrontiamo?'],
 ['Lun', 0, 'Mi piacerebbe unire le mie illustrazioni ai tuoi video.', 'Ho già qualche idea da farti vedere ✨'],
 ['Lun', 0, 'Sto sperimentando dei materiali per la nuova animazione.', 'Ti giro un’anteprima nel pomeriggio.'],
 ['Dom', 0, 'Sto preparando un editoriale con una luce molto cinematografica.', 'Ti mando alcuni riferimenti visivi.'],
 ['Dom', 0, 'Il festival cerca qualcuno per un breve video di apertura.', 'Ti va di sentirci questa settimana?'],
 ['Sab', 0, 'Sono tornata con le foto dell’ultima alba.', 'Penso che alcune starebbero benissimo nel tuo montaggio.'],
 ['Sab', 0, 'Ho registrato i suoni del mercato per il documentario.', 'Ascolta questa prima selezione quando puoi.'],
 ['Ven', 0, 'Ho trovato uno spazio perfetto per le riprese.', 'Ti mando la pianta e qualche foto.'],
 ['Ven', 0, 'La prima demo interattiva è online.', 'Mi piacerebbe sapere cosa ne pensi.'],
 ['Gio', 0, 'Sto montando i primi episodi della serie sulla città.', 'Ti mando un estratto appena è pronto.'],
 ['Gio', 0, 'Le foto dell’ultima escursione sono pronte.', 'Vorrei usarle per un breve racconto video.'],
 ['Mer', 0, 'Ho fatto qualche prova con forme e movimento.', 'Ti condivido i render nel pomeriggio.'],
];
export const initialConversations = users.map((user, i) => {
 const [time, unread, opener, reply] = conversationSeeds[i];
 return { id: user.id, user, time, unread, messages: [
  { id: `${i}-a`, text: opener, sent: false, time: '10:00' },
  { id: `${i}-b`, text: 'Che bello sentirti! Raccontami di più, sono curioso.', sent: true, time: '10:12' },
  { id: `${i}-c`, text: reply, sent: false, time: ['12:42', '11:18', '10:05', '16:30', '15:24', '18:05', '14:12'][i] || '14:30' },
 ] };
});
export const portfolio = [
 { image: images.coast, title: 'Coste lontane' }, { image: images.forest, title: 'Dentro il verde' }, { image: images.mountain, title: 'Altitudini' },
 { image: images.portrait, title: 'Volti e storie' }, { image: images.desert, title: 'Terra sospesa' }, { image: images.ocean, title: 'Il ritmo del mare' },
 { image: images.city, title: 'Notti a Milano' }, { image: images.architecture, title: 'Linee urbane' }, { image: images.music, title: 'Sessioni live' },
 { image: images.sunrise, title: 'Primo chiarore' }, { image: images.road, title: 'Verso altrove' }, { image: images.gathering, title: 'Storie condivise' },
 { image: images.studioPortrait, title: 'Ritratti in studio' }, { image: images.craft, title: 'Dietro le quinte' }, { image: images.event, title: 'Una sera insieme' },
 { image: images.interior, title: 'Spazi e persone' }, { image: images.workshop, title: 'Idee in movimento' }, { image: images.minimal, title: 'Pausa visiva' },
];
export const profileProjects = [
 { id: 'beyond-city', title: 'Al di là della città', description: 'Un documentario sulle persone che hanno scelto di rallentare.', image: images.forest, status: 'Cerco collaboratori', phase: 'Pre-produzione', progress: 30, period: 'Ott – Dic 2026', location: 'Milano e dintorni', nextStep: 'Chiudere la squadra e fissare le prime interviste.', collaborators: [{ userId: 'giulia', role: 'Fotografia' }, { userId: 'karim', role: 'Sound design' }], applications: [{ userId: 'chiara', role: 'Montaggio video', date: 'Oggi', note: 'Mi piacerebbe montare le interviste con un ritmo intimo e naturale.' }, { userId: 'sofia', role: 'Titoli e grafica', date: 'Ieri', note: 'Posso curare titoli e materiali visivi per il lancio.' }] },
 { id: 'blue-hours', title: 'Blue hours', description: 'Una serie di ritratti video, tra l’ultima luce e la notte.', image: images.coast, status: 'In corso', phase: 'Riprese', progress: 65, period: 'Set – Nov 2026', location: 'Milano, Italia', nextStep: 'Girare gli ultimi due ritratti e iniziare il montaggio.', collaborators: [{ userId: 'giulia', role: 'Fotografia' }, { userId: 'marta', role: 'Styling' }], applications: [{ userId: 'sara', role: 'Motion design', date: '2 giorni fa', note: 'Vorrei animare i titoli con la stessa luce dei ritratti.' }] },
 { id: 'live-studio', title: 'Live from the studio', description: 'Tre artisti, uno studio, una sola ripresa.', image: images.music, status: 'Completato', phase: 'Pubblicato', progress: 100, period: 'Mar – Giu 2026', location: 'Bologna, Italia', nextStep: 'Video pubblicato. Il team ha concluso il progetto.', collaborators: [{ userId: 'andrea', role: 'Produzione musicale' }, { userId: 'giulia', role: 'Fotografia' }, { userId: 'elena', role: 'Visual e copertina' }], applications: [] },
 { id: 'open-roads', title: 'Strade aperte', description: 'Un diario di viaggio filmato lungo le strade meno conosciute.', image: images.road, status: 'In corso', phase: 'Montaggio', progress: 75, period: 'Giu – Ott 2026', location: 'Sardegna, Italia', nextStep: 'Chiudere il montaggio e scegliere la musica originale.', collaborators: [{ userId: 'pietro', role: 'Fotografia outdoor' }], applications: [{ userId: 'chiara', role: 'Montaggio video', date: 'Oggi', note: 'Ho lavorato a racconti di viaggio e mi piacerebbe aiutare con il montaggio.' }, { userId: 'karim', role: 'Musica e suono', date: '3 giorni fa', note: 'Posso creare una traccia originale a partire dai suoni raccolti in viaggio.' }] },
 { id: 'people-ideas', title: 'Le persone dietro le idee', description: 'Brevi incontri video con chi costruisce progetti indipendenti.', image: images.gathering, status: 'Cerco collaboratori', phase: 'Ideazione', progress: 15, period: 'Nov 2026 – Gen 2027', location: 'Da remoto e Milano', nextStep: 'Definire il format e scegliere i primi ospiti.', collaborators: [], applications: [{ userId: 'tommaso', role: 'Identità visiva', date: 'Ieri', note: 'Vorrei dare alla serie un’identità semplice e riconoscibile.' }, { userId: 'beatrice', role: 'Scenografia', date: '4 giorni fa', note: 'Posso aiutarti a progettare un set flessibile per le interviste.' }] },
 { id: 'first-light', title: 'Prima luce', description: 'Una serie di mini documentari girati nelle prime ore del mattino.', image: images.sunrise, status: 'Completato', phase: 'Pubblicato', progress: 100, period: 'Apr – Lug 2026', location: 'Trentino, Italia', nextStep: 'Serie pubblicata. Tutti gli episodi sono disponibili.', collaborators: [{ userId: 'alice', role: 'Fotografia' }, { userId: 'andrea', role: 'Musiche originali' }], applications: [] },
];

export const discovery = [
 { label: 'Esplora', avatar: users[5].avatar }, { label: '3D', avatar: users[6].avatar }, { label: 'Video', avatar: users[0].avatar }, { label: 'Design', avatar: users[3].avatar }, { label: 'Foto', avatar: users[1].avatar }, { label: 'Musica', avatar: users[2].avatar },
];

export const searchCategories = [
 { label: 'Video', icon: 'Video', color: '#d6cb4d' },
 { label: 'Design', icon: 'Paintbrush', color: '#c69b7e' },
 { label: 'Foto', icon: 'Camera', color: '#a5a8cf' },
 { label: '3D', icon: 'Box', color: '#b3a0ca' },
 { label: 'Musica', icon: 'Music2', color: '#8bb9a4' },
 { label: 'Sviluppo', icon: 'Code2', color: '#8cb7c6' },
 { label: 'UX/UI', icon: 'PanelsTopLeft', color: '#c595b3' },
 { label: 'Branding', icon: 'Type', color: '#c7b28d' },
 { label: 'Illustrazione', icon: 'PenTool', color: '#b4ac8b' },
 { label: 'Motion', icon: 'Clapperboard', color: '#91a7b5' },
 { label: 'Architettura', icon: 'Building2', color: '#afa49b' },
 { label: 'Sound Design', icon: 'AudioLines', color: '#91afa3' },
];
export const initialRecentSearches = ['color grading', 'videomaker milano', 'documentario', 'fotografia paesaggi', 'sound design'];
export const searchPeople = users.map((user, i) => ({ ...user,
 city: ['Milano', 'Milano', 'Bologna', 'Torino', 'Roma', 'Bologna', 'Firenze', 'Milano', 'Torino', 'Trento', 'Milano', 'Venezia', 'Padova', 'Napoli', 'Aosta', 'Genova'][i],
 skills: [
  ['Video', 'Videomaking', 'Color Grading', 'Documentario'], ['Foto', 'Fotografia', 'Paesaggi', 'Architettura'],
  ['Musica', 'Sound Design', 'Produzione'], ['Design', 'UX/UI', 'Branding'], ['Sviluppo', 'Developer', 'Web'],
  ['Illustrazione', 'Design', 'Branding'], ['3D', 'Motion', 'Design'], ['Styling', 'Art direction', 'Design'],
  ['Branding', 'Design', 'Tipografia'], ['Foto', 'Fotografia', 'Paesaggi'], ['Musica', 'Sound Design', 'Podcast'],
  ['Architettura', 'Interior design', 'Design'], ['Sviluppo', 'Developer', 'UX/UI', 'Motion'],
  ['Video', 'Videomaking', 'Montaggio', 'Documentario'], ['Foto', 'Fotografia', 'Outdoor', 'Paesaggio'],
  ['3D', 'Motion', 'Digital sculpture'],
 ][i],
}));
export const featuredPostIds = ['p1', 'p10', 'p9', 'p8', 'p3', 'p12'];
const normalizeSearch = text => text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, ' ').trim();
export function searchMockData(query) {
 const terms = normalizeSearch(query).split(/\s+/).filter(Boolean);
 if (!terms.length) return { people: [], projects: [], portfolio: [] };
 const matches = fields => { const text = normalizeSearch(fields.join(' ')); return terms.every(term => text.includes(term)); };
 const people = searchPeople.filter(user => matches([user.name, user.username, user.profession, user.city, ...user.skills]));
 const matchingPosts = posts.filter(post => {
  const author = searchPeople.find(user => user.id === post.user.id);
  return matches([post.title, post.description, post.user.username, post.user.profession, post.location, post.category, post.discovery, ...post.tags, ...(author?.skills || [])]);
 });
 return { people, projects: matchingPosts.filter(post => post.type === 'project'), portfolio: matchingPosts.filter(post => post.type === 'portfolio') };
}
