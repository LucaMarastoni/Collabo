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
};
export const users = [
 { id: 'marco', name: 'Marco Rossi', username: 'marco.frames', profession: 'Videomaker', avatar: photo('photo-1500648767791-00dcc994a43e', 100) },
 { id: 'giulia', name: 'Giulia Bianchi', username: 'giulia.studio', profession: 'Fotografa', avatar: photo('photo-1494790108377-be9c29b29330', 100) },
 { id: 'andrea', name: 'Andrea Costa', username: 'andrea.wav', profession: 'Music producer', avatar: photo('photo-1506794778202-cad84cf45f1d', 100) },
 { id: 'sofia', name: 'Sofia Ricci', username: 'sofia.design', profession: 'UI/UX designer', avatar: photo('photo-1531123897727-8f129e1688ce', 100) },
 { id: 'davide', name: 'Davide Moretti', username: 'davide.builds', profession: 'Developer', avatar: photo('photo-1506794778202-cad84cf45f1d', 100) },
 { id: 'elena', name: 'Elena Ferri', username: 'elena.draws', profession: 'Illustratrice', avatar: photo('photo-1517841905240-472988babdf9', 100) },
 { id: 'nicolo', name: 'Nicolò Riva', username: 'nico.render', profession: '3D artist', avatar: photo('photo-1500648767791-00dcc994a43e', 100) },
];
export const currentUser = { name: 'Luca', username: 'luca.visuals', profession: 'Videomaker', city: 'Milano, Italia', bio: 'Racconto storie attraverso immagini in movimento. Sempre alla ricerca di nuovi punti di vista e persone con cui creare.', portfolio: 'https://vimeo.com', avatar: photo('photo-1506794778202-cad84cf45f1d', 200) };
export const posts = [
 { id: 'p1', type: 'project', user: users[0], image: images.mountain, alt: 'Vette delle Dolomiti illuminate dalla luce del mattino', title: 'Documentario sulle Alpi italiane', description: 'Un corto tra le Dolomiti. Cerco un fonico, un colorist e un assistente di produzione per raccontare queste montagne.', tags: ['Videomaking', 'Color Grading', 'Sound Design', 'Produzione', 'Montaggio'], likes: 128, comments: 12, time: '2 ore fa', category: 'CORTOMETRAGGIO', location: 'Dolomiti, Italia', period: 'Ott – Nov 2026', remote: true, discovery: 'Video', gallery: [{ image: images.mountain, alt: 'Vette delle Dolomiti' }, { image: images.forest, alt: 'Bosco alpino' }, { image: images.coast, alt: 'Paesaggio d’acqua' }, { image: images.desert, alt: 'Studio di luce sul paesaggio' }] },
 { id: 'p2', type: 'portfolio', user: users[1], image: images.architecture, alt: 'Architettura bianca dalle linee geometriche sotto un cielo azzurro', title: 'La forma del silenzio', description: 'Luce, geometrie e spazi da abitare. Una selezione dal mio ultimo progetto di fotografia architettonica.', tags: ['Fotografia', 'Architettura', 'Editoriale'], likes: 246, comments: 18, time: '4 ore fa', category: 'VISUAL DIARY / 024', location: 'Milano, Italia', discovery: 'Foto', gallery: [{ image: images.architecture, alt: 'Architettura e geometrie' }, { image: images.city, alt: 'Profilo urbano di notte' }, { image: images.portrait, alt: 'Ritratto in luce naturale' }] },
 { id: 'p3', type: 'project', user: users[2], image: images.music, alt: 'Microfono in uno studio musicale', title: 'Suoni fuori orario', description: 'Sto producendo un EP elettronico ispirato alla città di notte. Cerco una voce e un visual artist per costruire un mondo insieme.', tags: ['Vocalist', 'Visual artist'], likes: 87, comments: 6, time: '5 ore fa', category: 'INDIPENDENT MUSIC', location: 'Bologna, Italia', period: 'Nov – Dic 2026', remote: true, discovery: 'Musica', gallery: [{ image: images.music, alt: 'Microfono in studio' }, { image: images.city, alt: 'La città di notte' }] },
 { id: 'p4', type: 'portfolio', user: users[3], image: images.desert, alt: 'Dune di sabbia dorata nel deserto', title: 'Dune — un viaggio essenziale', description: 'Direzione visiva e UI per un magazine di viaggi lenti. Un linguaggio essenziale che lascia parlare i luoghi.', tags: ['UI/UX', 'Art direction', 'Web design'], likes: 193, comments: 9, time: '7 ore fa', category: 'DIGITAL EXPERIENCE', location: 'Torino, Italia', discovery: 'Design', gallery: [{ image: images.desert, alt: 'Dune di sabbia' }, { image: images.coast, alt: 'Costa al tramonto' }, { image: images.architecture, alt: 'Studio di layout' }] },
 { id: 'p5', type: 'project', user: users[4], image: images.city, alt: 'Cielo notturno sopra la città', title: 'La città, a modo nostro', description: 'Una mappa interattiva dei piccoli spazi culturali indipendenti. Il codice c’è: cerco chi mi aiuti a raccontarli con una nuova identità.', tags: ['UI designer', 'Illustratore'], likes: 64, comments: 7, time: '9 ore fa', category: 'SIDE PROJECT', location: 'Roma, Italia', period: 'Ott 2026', remote: false, discovery: 'Design', gallery: [{ image: images.city, alt: 'Cielo sopra la città' }, { image: images.architecture, alt: 'Spazi culturali' }] },
 { id: 'p6', type: 'portfolio', user: users[6], image: images.ocean, alt: 'Onde dell’oceano e riflessi sulla superficie', title: 'Studi di superficie', description: 'L’oceano come riferimento per una ricerca su materiali, luce e movimento. Appunti visivi per la mia prossima serie 3D.', tags: ['3D art', 'Ricerca visiva', 'Motion'], likes: 312, comments: 21, time: 'Ieri', category: 'TEXTURE STUDIES', location: 'Firenze, Italia', discovery: '3D', gallery: [{ image: images.ocean, alt: 'Onde dell’oceano' }, { image: images.forest, alt: 'Texture di bosco' }] },
];
export const creators = users.map(user => ({ ...user, posts: posts.filter(post => post.user.id === user.id) })).filter(user => user.posts.length);
export const initialConversations = users.map((user, i) => ({ id: user.id, user, time: ['12:42', '11:18', '10:05', 'Ieri', 'Ieri', 'Lun', 'Lun'][i], unread: [2, 1, 0, 0, 0, 0, 0][i], messages: [
 { id: `${i}-a`, text: ['Ciao Luca! Ho visto il tuo ultimo video, mi piace molto la fotografia.', 'Ciao Luca! Ti va di lavorare insieme a un editoriale?', 'Ho ascoltato il riferimento che mi hai mandato. Bellissima atmosfera.', 'Ti mando una prima proposta per il sito del portfolio.', 'La prima versione del progetto è pronta per essere vista.', 'Mi piacerebbe unire le mie illustrazioni ai tuoi video.', 'Sto sperimentando dei materiali per la nuova animazione.'][i], sent: false, time: '10:00' },
 { id: `${i}-b`, text: 'Che bello sentirti! Raccontami di più, sono curioso.', sent: true, time: '10:12' },
 { id: `${i}-c`, text: ['Ti va di parlarne davanti a un caffè? ☕', 'Ti ho mandato la moodboard, fammi sapere!', 'Perfetto, ci sentiamo domani 🎧', 'Che ne pensi di questa direzione?', 'Appena hai un momento, ci confrontiamo?', 'Ho già qualche idea da farti vedere ✨', 'Ti giro un’anteprima nel pomeriggio.'][i], sent: false, time: ['12:42', '11:18', '10:05', '16:30', '15:24', '18:05', '14:12'][i] },
] }));
export const portfolio = [
 { image: images.coast, title: 'Coste lontane' }, { image: images.forest, title: 'Dentro il verde' }, { image: images.mountain, title: 'Altitudini' },
 { image: images.portrait, title: 'Volti e storie' }, { image: images.desert, title: 'Terra sospesa' }, { image: images.ocean, title: 'Il ritmo del mare' },
 { image: images.city, title: 'Notti a Milano' }, { image: images.architecture, title: 'Linee urbane' }, { image: images.music, title: 'Sessioni live' },
];
export const profileProjects = [
 { title: 'Al di là della città', description: 'Un documentario sulle persone che hanno scelto di rallentare.', image: images.forest, status: 'Cerco collaboratori' },
 { title: 'Blue hours', description: 'Una serie di ritratti video, tra l’ultima luce e la notte.', image: images.coast, status: 'In corso' },
 { title: 'Live from the studio', description: 'Tre artisti, uno studio, una sola ripresa.', image: images.music, status: 'Completato' },
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
 city: ['Milano', 'Milano', 'Bologna', 'Torino', 'Roma', 'Bologna', 'Firenze'][i],
 skills: [ ['Video', 'Videomaking', 'Color Grading', 'Documentario'], ['Foto', 'Fotografia', 'Paesaggi', 'Architettura'], ['Musica', 'Sound Design', 'Produzione'], ['Design', 'UX/UI', 'Branding'], ['Sviluppo', 'Developer', 'Web'], ['Illustrazione', 'Design', 'Branding'], ['3D', 'Motion', 'Design'] ][i],
}));
export const featuredPostIds = ['p1', 'p3', 'p5', 'p4'];
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
