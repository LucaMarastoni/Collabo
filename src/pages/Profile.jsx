import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MapPin, ArrowUpRight, Grid3X3, Layers, Pencil, X, Check, Sparkles, ChevronRight, UsersRound, Inbox } from 'lucide-react';
import Header from '../components/Header';
import ProjectDetail, { projectSnapshot } from '../components/ProjectDetail';
import { portfolio, profileProjects, posts } from '../data/mockData';

const tabLabel = { portfolio: 'portfolio-tab', projects: 'projects-tab', saved: 'saved-tab' };

export default function Profile({ user, setUser, notify, postStates, updatePost, applicationDecisions, setApplicationDecisions }) {
 const [params, setParams] = useSearchParams();
 const selectedProject = profileProjects.find(project => project.id === params.get('project'));
 const [tab, setTab] = useState(() => selectedProject ? 'projects' : 'portfolio');
 const [editing, setEditing] = useState(false);
 const [draft, setDraft] = useState(user);
 const saved = posts.filter(post => postStates[post.id]?.cool);
 const collaborationCount = profileProjects.reduce((total, project) => total + projectSnapshot(project, applicationDecisions).collaborators.length, 0);

 function openProject(id) {
  setTab('projects');
  setParams({ project: id });
  window.scrollTo(0, 0);
 }

 function closeProject() {
  const id = selectedProject.id;
  setTab('projects');
  setParams({}, { replace: true });
  requestAnimationFrame(() => document.getElementById(`profile-project-${id}`)?.focus());
 }

 function decideApplication(project, application, decision) {
  setApplicationDecisions(previous => {
   const next = { ...previous };
   const key = `${project.id}:${application.userId}`;
   if (decision) next[key] = decision;
   else delete next[key];
   return next;
  });
  notify(decision === 'accepted' ? 'Collaboratore aggiunto al progetto' : decision === 'archived' ? 'Candidatura archiviata' : 'Candidatura rimessa in valutazione');
 }

 if (selectedProject) return <><Header title="Il tuo progetto"/><ProjectDetail project={selectedProject} decisions={applicationDecisions} onBack={closeProject} onDecision={decideApplication}/></>;

 return <><Header title="Profilo"/><section className="profile-page">
  <div className="profile-top"><img className="profile-avatar" src={user.avatar} alt={user.name}/></div>
  {editing ? <form className="edit-profile" onSubmit={event => { event.preventDefault(); setUser(draft); setEditing(false); notify('Profilo aggiornato'); }}>
   <div className="edit-heading"><h2>Modifica profilo</h2><button type="button" className="icon-button" aria-label="Annulla modifica" onClick={() => setEditing(false)}><X size={20}/></button></div>
   {[{ key: 'name', label: 'Nome' }, { key: 'profession', label: 'Professione' }, { key: 'city', label: 'Città' }, { key: 'bio', label: 'Bio' }].map(({ key, label }) => <label key={key}>{label}{key === 'bio' ? <textarea value={draft[key]} onChange={event => setDraft({ ...draft, [key]: event.target.value })} required maxLength={250}/> : <input value={draft[key]} onChange={event => setDraft({ ...draft, [key]: event.target.value })} required maxLength={70}/>}</label>)}
   <button className="primary-button"><Check size={18}/> Salva modifiche</button>
  </form> : <>
   <div className="profile-name"><h1>{user.name}</h1><span>@{user.username}</span></div>
   <p className="profession">{user.profession}</p><p className="bio">{user.bio}</p>
   <div className="profile-links"><span><MapPin size={15}/>{user.city}</span><a href={user.portfolio} target="_blank" rel="noreferrer">Portfolio video<ArrowUpRight size={16}/></a></div>
   <div className="profile-stats"><div><strong>{profileProjects.length}</strong><span>Progetti</span></div><div><strong>{collaborationCount}</strong><span>Collaborazioni</span></div><div><strong>846</strong><span>Follower</span></div></div>
   <button className="edit-button" onClick={() => { setDraft(user); setEditing(true); }}><Pencil size={15}/>Modifica profilo</button>
  </>}

  <div className="profile-tabs" role="tablist" aria-label="Lavori pubblicati">
   <button id="portfolio-tab" role="tab" aria-selected={tab === 'portfolio'} aria-controls="profile-panel" className={tab === 'portfolio' ? 'active' : ''} onClick={() => setTab('portfolio')}><Grid3X3 size={17}/>Portfolio<span>{portfolio.length}</span></button>
   <button id="projects-tab" role="tab" aria-selected={tab === 'projects'} aria-controls="profile-panel" className={tab === 'projects' ? 'active' : ''} onClick={() => setTab('projects')}><Layers size={18}/>Progetti<span>{profileProjects.length}</span></button>
   <button id="saved-tab" role="tab" aria-selected={tab === 'saved'} aria-controls="profile-panel" className={tab === 'saved' ? 'active' : ''} onClick={() => setTab('saved')}><Sparkles size={17}/>Che figo<span>{saved.length}</span></button>
  </div>
  <div id="profile-panel" role="tabpanel" aria-labelledby={tabLabel[tab]}>
   {tab === 'saved' ? (saved.length ? <div className="project-list">{saved.map(post => <article className="profile-project" key={post.id}><img src={post.image} alt=""/><div><span className="project-status status-0"><span/>{post.user.name} · {post.user.profession}</span><h2>{post.title}</h2><p>{post.description}</p></div><button className="icon-button remove-saved" aria-label={`Rimuovi ${post.title} da Che figo`} onClick={() => { updatePost(post.id, { cool: false }); notify('Progetto rimosso da Che figo'); }}><X size={18}/></button></article>)}</div> : <p className="saved-empty">Scorri a destra su un progetto nella home per salvarlo qui.</p>)
   : tab === 'portfolio' ? <div className="portfolio-grid">{portfolio.map(item => <figure key={item.title}><img src={item.image} alt={item.title} loading="lazy"/><figcaption>{item.title}</figcaption></figure>)}</div>
   : <div className="project-list">{profileProjects.map(project => {
    const { collaborators, pending } = projectSnapshot(project, applicationDecisions);
    return <button type="button" id={`profile-project-${project.id}`} className="profile-project project-card" key={project.id} onClick={() => openProject(project.id)}>
     <img src={project.image} alt="" loading="lazy"/>
     <span className="project-card-body"><span className={`project-status project-status-${project.status === 'Completato' ? 'done' : project.status === 'In corso' ? 'active' : 'open'}`}><span/>{project.status}</span><strong>{project.title}</strong><span className="project-card-description">{project.description}</span><span className="project-card-meta"><span><UsersRound size={13}/>{collaborators.length}</span><span><Inbox size={13}/>{pending.length} da valutare</span></span></span>
     <ChevronRight className="project-card-chevron" size={18} aria-hidden="true"/>
    </button>;
   })}</div>}
  </div>
 </section></>;
}
