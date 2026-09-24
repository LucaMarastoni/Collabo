import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import ProjectPost from './ProjectPost';
import { Heart, X, RotateCcw, MapPin, CalendarDays, Monitor, ChevronUp, Clock, Tag, Users, Hand, ArrowLeft, ArrowRight, ArrowUp, Pointer, CircleHelp } from 'lucide-react';
const THRESHOLD = 110;
const TAP_SLOP = 8;
const OPEN_SHEET = 40;
const CLOSE_SHEET = 100;
// Action buttons are hidden for now: gestures are taught by the coach overlay and the hint row.
const SHOW_ACTIONS = false;
const COACH_KEY = 'collab.deckCoachSeen';
function readCoachSeen() { try { return localStorage.getItem(COACH_KEY) === '1'; } catch { return false; } }
function writeCoachSeen() { try { localStorage.setItem(COACH_KEY, '1'); } catch { /* storage unavailable */ } }
export const slidesOf = person => person.posts.flatMap(post => (post.gallery || [{ image: post.image, alt: post.alt }]).map(item => ({ ...item, post })));
const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
function haptic(ms) { try { navigator.vibrate?.(ms); } catch { /* not supported */ } }
// Release speed in px/ms, measured over the last ~100ms of the gesture.
function velocity(samples) {
 const last = samples.at(-1);
 const first = samples.find(sample => last.t - sample.t <= 100) || last;
 const dt = Math.max(1, last.t - first.t);
 return { vx: (last.x - first.x) / dt, vy: (last.y - first.y) / dt };
}
export default function ProfileDeck({ people, startPostId, postStates, onCollaborate, onDecide, onUndo, canUndo, returning }) {
 const [exit, setExit] = useState(null);
 const deckRef = useRef(null);
 const gesture = useRef(null);
 const position = useRef({ dx: 0, dy: 0, tilt: 1 });
 const frame = useRef(0);
 const timer = useRef();
 const shownPost = useRef(null);
 const [coach, setCoach] = useState(() => !readCoachSeen());
 const [top] = people;
 useEffect(() => () => { clearTimeout(timer.current); cancelAnimationFrame(frame.current); }, []);
 // Drag state lives in CSS variables on the deck so moving a card never re-renders React.
 function paint(dx, dy, tilt = position.current.tilt) {
  const el = deckRef.current;
  if (!el) return;
  position.current = { dx, dy, tilt };
  const p = clamp(dx / THRESHOLD, -1, 1);
  el.style.setProperty('--dx', `${dx}px`);
  el.style.setProperty('--dy', `${dy}px`);
  el.style.setProperty('--rot', `${clamp(dx * 0.06 * tilt, -35, 35)}deg`);
  el.style.setProperty('--lift', Math.abs(p));
  el.style.setProperty('--like', Math.max(0, p));
  el.style.setProperty('--pass', Math.max(0, -p));
  el.dataset.dir = p > 0.25 ? 'like' : p < -0.25 ? 'pass' : '';
 }
 function schedule(dx, dy) { position.current = { ...position.current, dx, dy }; cancelAnimationFrame(frame.current); frame.current = requestAnimationFrame(() => paint(dx, dy)); }
 function release() { const el = deckRef.current; el?.classList.remove('is-dragging', 'is-pressed'); cancelAnimationFrame(frame.current); paint(0, 0); }
 useLayoutEffect(() => { setExit(null); deckRef.current?.classList.remove('is-leaving', 'is-dragging', 'is-pressed'); paint(0, 0, 1); }, [top?.id]);
 function decide(direction, { vx = 0, vy = 0 } = {}) {
  if (!top || exit) return;
  dismissCoach();
  setExit(direction);
  haptic(12);
  cancelAnimationFrame(frame.current);
  const el = deckRef.current;
  const sign = direction === 'right' ? 1 : -1;
  const { dx, dy } = position.current;
  const targetX = sign * (window.innerWidth + 240);
  // Keep the speed of the fling: a fast flick leaves fast, a slow drag glides out.
  const ms = clamp(Math.abs(targetX - dx) / Math.max(Math.abs(vx), 1.4), 180, 360);
  el.style.setProperty('--exit-ms', `${ms}ms`);
  el.classList.remove('is-dragging', 'is-pressed');
  el.classList.add('is-leaving');
  paint(targetX, dy + clamp(vy, -1.5, 1.5) * ms * 0.6);
  const id = top.id, postId = shownPost.current;
  timer.current = setTimeout(() => onDecide(id, direction === 'right' ? 'liked' : 'passed', postId), ms);
 }
 function dismissCoach() { if (!coach) return; setCoach(false); writeCoachSeen(); }
 const handlers = {
  onPointerDown(event) {
   if (exit || event.button > 0) return;
   const box = event.currentTarget.getBoundingClientRect();
   gesture.current = { x: event.clientX, y: event.clientY, id: event.pointerId, samples: [{ t: event.timeStamp, x: event.clientX, y: event.clientY }], armed: false };
   // Grabbing the lower half tilts the card the other way, like holding a real card.
   position.current.tilt = event.clientY - box.top < box.height / 2 ? 1 : -1;
   event.currentTarget.setPointerCapture(event.pointerId);
   deckRef.current.classList.add('is-pressed');
  },
  onPointerMove(event) {
   const g = gesture.current;
   if (g?.id !== event.pointerId || g.vertical) return;
   const dx = event.clientX - g.x, dy = event.clientY - g.y;
   if (!g.horizontal && Math.abs(dy) > TAP_SLOP && Math.abs(dy) > Math.abs(dx)) { g.vertical = true; release(); return; }
   if (!g.horizontal && Math.abs(dx) > TAP_SLOP) { g.horizontal = true; deckRef.current.classList.add('is-dragging'); }
   if (!g.horizontal) return;
   g.samples.push({ t: event.timeStamp, x: event.clientX, y: event.clientY });
   if (g.samples.length > 8) g.samples.shift();
   const armed = Math.abs(dx) > THRESHOLD;
   if (armed !== g.armed) { g.armed = armed; if (armed) haptic(8); }
   schedule(dx, dy * 0.3);
  },
  onPointerEnd(event, onTap, onVertical) {
   const g = gesture.current;
   if (g?.id !== event.pointerId) return;
   gesture.current = null;
   const dx = event.clientX - g.x, dy = event.clientY - g.y;
   const up = event.type === 'pointerup';
   if (g.vertical) { release(); if (up && Math.abs(dy) > OPEN_SHEET) onVertical(); return; }
   if (!g.horizontal) { release(); if (up && Math.abs(dx) < TAP_SLOP && Math.abs(dy) < TAP_SLOP) onTap(event); return; }
   g.samples.push({ t: event.timeStamp, x: event.clientX, y: event.clientY });
   const speed = velocity(g.samples);
   const flick = Math.abs(speed.vx) > 0.5 && Math.abs(dx) > 24 && Math.sign(speed.vx) === Math.sign(dx);
   if (up && (Math.abs(dx) > THRESHOLD || flick)) decide(dx > 0 ? 'right' : 'left', speed);
   else release();
  },
 };
 return <section className="profile-deck" ref={deckRef} aria-label="Persone da scoprire">
  <div className="deck-stack">
   {!top && <div className="deck-empty"><strong>Hai visto tutti</strong><p>I progetti che ti sono piaciuti sono nella sezione “Che figo” del tuo profilo.</p></div>}
   {people.slice(0, 3).map((person, depth) => depth === 0
    ? <PersonCard key={person.id} person={person} startPostId={startPostId} className={`deck-card top ${coach ? 'demo' : ''} ${returning?.id === person.id ? `return-${returning.from}` : ''}`} handlers={handlers} onDecide={decide} onShow={id => { shownPost.current = id; }} postStates={postStates} onCollaborate={onCollaborate}/>
    : <PersonCard key={person.id} person={person} className="deck-card behind" style={{ '--depth': depth }} hidden/>)}
   {!coach && top && !exit && <button className="deck-help" aria-label="Come funziona" title="Come funziona" onClick={() => setCoach(true)}><CircleHelp size={20}/></button>}
   {coach && top && <div className="deck-coach" onPointerDown={dismissCoach}>
    <div className="coach-hand" aria-hidden="true"><Hand size={34}/></div>
    <ul>
     <li><ArrowRight size={17}/><span><strong>Scorri a destra</strong> se ti piace: lo salvi in Che figo</span></li>
     <li><ArrowLeft size={17}/><span><strong>Scorri a sinistra</strong> se non ti interessa</span></li>
     <li><ArrowUp size={17}/><span><strong>Scorri su</strong> per leggere tutti i dettagli</span></li>
     <li><Pointer size={17}/><span><strong>Tocca la foto</strong> per vedere gli altri lavori</span></li>
    </ul>
    <button className="primary-button" onClick={dismissCoach}>Ho capito</button>
   </div>}
  </div>
  {!SHOW_ACTIONS && top && <div className="deck-hint">
   <span aria-hidden="true" className="hint-pass"><ArrowLeft size={14}/>Non mi interessa</span>
   {canUndo && !exit ? <button className="hint-undo" onClick={onUndo} aria-label="Annulla ultima scelta"><RotateCcw size={13}/>Annulla</button> : <span className="hint-dot" aria-hidden="true"/>}
   <span aria-hidden="true" className="hint-like">Che figo<ArrowRight size={14}/></span>
  </div>}
  {SHOW_ACTIONS && <div className="deck-actions">
   <button className={`deck-button pass ${exit === 'left' ? 'pop' : ''}`} aria-label="Non mi interessa" disabled={!top} onClick={() => decide('left')}><X size={26}/></button>
   <button className="deck-button undo" aria-label="Annulla ultima scelta" disabled={!canUndo || !!exit} onClick={onUndo}><RotateCcw size={18}/></button>
   <button className={`deck-button like ${exit === 'right' ? 'pop' : ''}`} aria-label="Che figo, salva il progetto nel profilo" disabled={!top} onClick={() => decide('right')}><Heart size={25} fill={exit === 'right' ? 'currentColor' : 'none'}/></button>
  </div>}
 </section>;
}
function PersonCard({ person, startPostId, className, style, hidden, handlers, onDecide, onShow, postStates = {}, onCollaborate }) {
 const slides = slidesOf(person);
 const [index, setIndex] = useState(() => Math.max(0, slides.findIndex(slide => slide.post.id === startPostId)));
 const [sheet, setSheet] = useState(false);
 const cardRef = useRef(null);
 const slide = slides[Math.min(index, slides.length - 1)];
 const { post } = slide;
 useEffect(() => { onShow?.(post.id); }, [post.id]);
 function step(delta) { setIndex(current => Math.max(0, Math.min(slides.length - 1, current + delta))); }
 function onTap(event) { const box = event.currentTarget.getBoundingClientRect(); step(event.clientX - box.left < box.width / 3 ? -1 : 1); }
 function closeSheet() { setSheet(false); requestAnimationFrame(() => cardRef.current?.focus({ preventScroll: true })); }
 function onKeyDown(event) {
  const keys = { ArrowRight: () => onDecide('right'), ArrowLeft: () => onDecide('left'), ArrowDown: () => step(1), ArrowUp: () => step(-1), Enter: () => setSheet(true) };
  if (keys[event.key]) { event.preventDefault(); keys[event.key](); }
 }
 const stop = { onPointerDown: event => event.stopPropagation() };
 const live = hidden ? { 'aria-hidden': true } : {
  ref: cardRef, tabIndex: 0, 'aria-roledescription': 'scheda profilo', onKeyDown,
  'aria-label': `${person.name}, ${person.profession}. Tocca o usa le frecce su e giù per vedere i lavori, Invio per i dettagli, freccia destra che figo, freccia sinistra non mi interessa`,
  onPointerDown: handlers.onPointerDown, onPointerMove: handlers.onPointerMove,
  onPointerUp: event => handlers.onPointerEnd(event, onTap, () => setSheet(true)), onPointerCancel: event => handlers.onPointerEnd(event, onTap, () => setSheet(true)),
 };
 return <article id={post.id} className={className} style={style} {...live}>
  <img key={slide.image + index} className="deck-photo" src={slide.image} alt={slide.alt} draggable={false}/>
  {slides.length > 1 && <div className="deck-progress" aria-hidden="true">{slides.map((item, i) => <span key={i} className={i <= index ? 'seen' : ''}/>)}</div>}
  {!hidden && <span className="visually-hidden" aria-live="polite">{`Lavoro ${index + 1} di ${slides.length}: ${post.title}`}</span>}
  <div className="deck-overlay">
   <div className="deck-caption">
    <div className="deck-person"><img className="avatar small" src={person.avatar} alt="" draggable={false}/><span><strong>{person.name}</strong> · {person.profession}</span></div>
    <h3>{post.title}</h3>
    <span className={`deck-type ${post.type}`}>{post.type === 'project' ? 'Progetto' : 'Portfolio'} · {post.location.split(',')[0]}</span>
   </div>
   {post.type === 'project' && !hidden && <div className="deck-collaborate" {...stop}><ProjectPost compact requested={postStates[post.id]?.requested} onCollaborate={() => onCollaborate(post.id)}/></div>}
   {!hidden && <button className="deck-more" aria-label="Mostra tutti i dettagli" aria-haspopup="dialog" {...stop} onClick={() => setSheet(true)}><ChevronUp size={18}/></button>}
  </div>
  <span className="deck-stamp like">Che figo!</span>
  <span className="deck-stamp pass">Non mi interessa</span>
  {sheet && <DetailSheet person={person} post={post} requested={postStates[post.id]?.requested} onCollaborate={() => onCollaborate(post.id)} onShowPost={id => { setIndex(slides.findIndex(item => item.post.id === id)); }} onDecide={direction => { closeSheet(); onDecide(direction); }} onClose={closeSheet}/>}
 </article>;
}
function DetailSheet({ person, post, requested, onCollaborate, onShowPost, onDecide, onClose }) {
 const [offset, setOffset] = useState(0);
 const [closing, setClosing] = useState(false);
 const body = useRef(null);
 const panel = useRef(null);
 const drag = useRef(null);
 const isProject = post.type === 'project';
 const projects = person.posts.filter(item => item.type === 'project').length;
 function close() { if (closing) return; setClosing(true); setTimeout(onClose, 220); }
 useEffect(() => {
  panel.current?.focus();
  const onKey = event => { if (event.key === 'Escape') close(); };
  document.addEventListener('keydown', onKey);
  return () => document.removeEventListener('keydown', onKey);
 }, []);
 useEffect(() => { body.current?.scrollTo({ top: 0 }); }, [post.id]);
 // Dragging down from the top of the content pulls the whole sheet down.
 useEffect(() => {
  const el = body.current;
  const onStart = event => { drag.current = { y: event.touches[0].clientY, atTop: el.scrollTop <= 0, dy: 0 }; };
  const onMove = event => {
   const state = drag.current;
   if (!state?.atTop) return;
   state.dy = event.touches[0].clientY - state.y;
   if (state.dy > 0) { event.preventDefault(); setOffset(state.dy); }
  };
  const onEnd = () => { const state = drag.current; drag.current = null; if (state?.dy > CLOSE_SHEET) close(); else setOffset(0); };
  el.addEventListener('touchstart', onStart, { passive: true });
  el.addEventListener('touchmove', onMove, { passive: false });
  el.addEventListener('touchend', onEnd);
  return () => { el.removeEventListener('touchstart', onStart); el.removeEventListener('touchmove', onMove); el.removeEventListener('touchend', onEnd); };
 }, []);
 const grab = {
  onPointerDown(event) { drag.current = { y: event.clientY, dy: 0, id: event.pointerId }; event.currentTarget.setPointerCapture(event.pointerId); },
  onPointerMove(event) { if (drag.current?.id !== event.pointerId) return; drag.current.dy = Math.max(0, event.clientY - drag.current.y); setOffset(drag.current.dy); },
  onPointerUp(event) { if (drag.current?.id !== event.pointerId) return; const { dy } = drag.current; drag.current = null; if (dy > CLOSE_SHEET) close(); else setOffset(0); },
 };
 grab.onPointerCancel = grab.onPointerUp;
 // Portal events still bubble through the React tree: keep them away from the card's gesture and key handlers.
 const isolate = event => event.stopPropagation();
 return createPortal(<div className={`sheet-root ${closing ? 'closing' : ''}`} onPointerDown={isolate} onPointerMove={isolate} onPointerUp={isolate} onPointerCancel={isolate} onKeyDown={isolate}>
  <div className="sheet-backdrop" onClick={close} style={{ opacity: Math.max(0, 1 - offset / 400) }}/>
  <div className={`sheet ${offset ? 'dragging' : ''}`} role="dialog" aria-modal="true" aria-labelledby="sheet-title" tabIndex={-1} ref={panel} style={{ transform: `translateY(${offset}px)` }}>
   <div className="sheet-grab" {...grab}><span className="sheet-handle"/><div className="sheet-head"><img className="avatar small" src={person.avatar} alt=""/><div><h2 id="sheet-title">{post.title}</h2><span>{person.name} · {isProject ? 'Progetto' : 'Portfolio'}</span></div><button className="icon-button" aria-label="Chiudi dettagli" onPointerDown={event => event.stopPropagation()} onClick={close}><X size={22}/></button></div></div>
   <div className="sheet-body" ref={body}>
    <img className="sheet-cover" src={post.image} alt={post.alt}/>
    <section><h4>{isProject ? 'Il progetto' : 'Il lavoro'}</h4><p className="deck-lead">{post.description}</p><span className="deck-category">{post.category}</span></section>
    <section><h4>{isProject ? 'In breve' : 'Info'}</h4><dl className="deck-facts">
     <div><dt><MapPin size={16}/>Dove</dt><dd>{post.location}</dd></div>
     {isProject && <div><dt><CalendarDays size={16}/>Quando</dt><dd>{post.period}</dd></div>}
     {isProject && <div><dt><Monitor size={16}/>Modalità</dt><dd>{post.remote ? 'Anche da remoto' : 'Solo in presenza'}</dd></div>}
     <div><dt><Tag size={16}/>Ambito</dt><dd>{post.discovery}</dd></div>
     <div><dt><Clock size={16}/>Pubblicato</dt><dd>{post.time}</dd></div>
    </dl></section>
    <section><h4>{isProject ? 'Chi sta cercando' : 'Competenze'}</h4><div className="tags">{post.tags.map(tag => <span className="tag" key={tag}>{isProject && <Users size={13}/>}{tag}</span>)}</div>{isProject && <p className="deck-note">Se una di queste figure sei tu, proponiti con Collabora: {person.name.split(' ')[0]} riceverà la tua richiesta.</p>}</section>
    <section><h4>Chi è</h4><div className="deck-author"><img className="avatar" src={person.avatar} alt=""/><div><strong>{person.name}</strong><span>@{person.username} · {person.profession}</span><span>{projects} {projects === 1 ? 'progetto' : 'progetti'} · {person.posts.length - projects} portfolio</span></div></div></section>
    {person.posts.length > 1 && <section><h4>Altri lavori</h4><div className="deck-others">{person.posts.filter(item => item.id !== post.id).map(item => <button key={item.id} onClick={() => onShowPost(item.id)}><img src={item.image} alt=""/><span>{item.title}</span></button>)}</div></section>}
   </div>
   <div className="sheet-actions">
    <button className="deck-button pass" aria-label="Non mi interessa" onClick={() => onDecide('left')}><X size={24}/></button>
    {isProject && <ProjectPost requested={requested} onCollaborate={onCollaborate}/>}
    <button className="deck-button like" aria-label="Che figo, salva il progetto nel profilo" onClick={() => onDecide('right')}><Heart size={23}/></button>
   </div>
  </div>
 </div>, document.body);
}
