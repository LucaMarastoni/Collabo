// Explains in one line why a card is shown, from the viewer's profile. Demo rules, replaced by real matching with the backend.
const normalize = text => text.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
const list = items => items.length > 1 ? `${items.slice(0, -1).join(', ')} e ${items.at(-1)}` : items[0];

export function relevanceReason(post, user) {
 const skills = new Map(user.skills.map(skill => [normalize(skill), skill]));
 const wanted = [...(post.roles || []), ...post.tags];
 const matched = [...new Set(wanted.map(item => skills.get(normalize(item))).filter(Boolean))].slice(0, 2);
 const city = user.city.split(',')[0];
 const near = normalize(post.location).startsWith(normalize(city));
 const extra = near ? `vicino a te, a ${city}` : post.type === 'project' && post.remote ? 'anche da remoto' : '';
 if (matched.length) return `Compatibile con le tue skill ${list(matched)}${extra ? ` · ${extra}` : ''}`;
 if (near && post.type === 'project') return `Vicino a te, a ${city} · disponibile da ${user.availableFrom}`;
 if (near) return `Vicino a te, a ${city}`;
 if (user.interests.includes(post.discovery)) return `Nel tuo ambito di interesse: ${post.discovery}`;
 if (post.type === 'project' && post.remote) return `Si lavora anche da remoto · ambito ${post.discovery}`;
 return `Nuovo nell'ambito ${post.discovery}`;
}
