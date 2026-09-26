import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, CalendarDays, Check, Inbox, MapPin, UsersRound, X } from 'lucide-react';
import { users } from '../data/mockData';

const peopleById = Object.fromEntries(users.map(user => [user.id, user]));

export function projectSnapshot(project, decisions) {
 const accepted = project.applications
  .filter(application => decisions[`${project.id}:${application.userId}`] === 'accepted')
  .map(application => ({ userId: application.userId, role: application.role }));
 const pending = project.applications.filter(application => !decisions[`${project.id}:${application.userId}`]);
 return { collaborators: [...project.collaborators, ...accepted], pending };
}

export default function ProjectDetail({ project, decisions, onBack, onDecision }) {
 const { collaborators, pending } = projectSnapshot(project, decisions);
 const tone = project.status === 'Completato' ? 'done' : project.status === 'In corso' ? 'active' : 'open';

 return <section className="project-detail-page" aria-labelledby="project-detail-title">
  <button type="button" className="project-detail-back" onClick={onBack}><ArrowLeft size={18}/>Tutti i progetti</button>
  <div className="project-detail-hero"><img src={project.image} alt="" /></div>
  <div className="project-detail-intro">
   <span className={`project-status project-status-${tone}`}><span/>{project.status}</span>
   <h1 id="project-detail-title">{project.title}</h1>
   <p>{project.description}</p>
   <div className="project-detail-facts"><span><MapPin size={15}/>{project.location}</span><span><CalendarDays size={15}/>{project.period}</span></div>
  </div>

  <div className="project-detail-metrics">
   <div><strong>{project.progress}%</strong><span>Avanzamento</span></div>
   <div><strong>{collaborators.length}</strong><span>Collaboratori</span></div>
   <div><strong>{pending.length}</strong><span>Candidature da valutare</span></div>
  </div>

  <section className="project-detail-section" aria-labelledby="project-progress-title">
   <div className="project-section-heading"><h2 id="project-progress-title">Stato del progetto</h2><span>{project.phase}</span></div>
   <progress className="project-progress" value={project.progress} max="100" aria-label="Avanzamento del progetto"/>
   <p className="project-next-step"><strong>{project.progress === 100 ? 'Esito' : 'Prossimo passo'}</strong>{project.nextStep}</p>
  </section>

  <section className="project-detail-section" aria-labelledby="project-team-title">
   <div className="project-section-heading"><h2 id="project-team-title">Collaboratori</h2><span><UsersRound size={15}/>{collaborators.length}</span></div>
   {collaborators.length ? <div className="project-people-list">{collaborators.map(({ userId, role }) => {
    const person = peopleById[userId];
    return <div className="project-person" key={userId}>
     <img src={person.avatar} alt=""/><div><strong>{person.name}</strong><span>{role}</span></div>
     <Link to={`/messages?chat=${userId}`} aria-label={`Scrivi a ${person.name}`} title={`Scrivi a ${person.name}`}><ArrowUpRight size={18}/></Link>
    </div>;
   })}</div> : <p className="project-section-empty">Non hai ancora confermato collaboratori per questo progetto.</p>}
  </section>

  <section className="project-detail-section" aria-labelledby="project-applications-title">
   <div className="project-section-heading"><h2 id="project-applications-title">Candidature</h2><span><Inbox size={15}/>{pending.length} da valutare</span></div>
   {project.applications.length ? <div className="project-applications">{project.applications.map(application => {
    const person = peopleById[application.userId];
    const decision = decisions[`${project.id}:${application.userId}`];
    return <article className="project-application" key={application.userId}>
     <div className="application-person"><img src={person.avatar} alt=""/><div><strong>{person.name}</strong><span>{application.role}</span></div><time>{application.date}</time></div>
     <p>“{application.note}”</p>
     {decision ? <div className="application-actions"><span className={`application-decision ${decision}`}>{decision === 'accepted' ? 'Accettata' : 'Archiviata'}</span><button type="button" className="application-undo" onClick={() => onDecision(project, application, null)}>Annulla</button></div>
      : <div className="application-actions"><button type="button" className="application-accept" onClick={() => onDecision(project, application, 'accepted')}><Check size={16}/>Accetta</button><button type="button" className="application-archive" onClick={() => onDecision(project, application, 'archived')}><X size={16}/>Archivia</button></div>}
    </article>;
   })}</div> : <p className="project-section-empty">{project.progress === 100 ? 'Il progetto è concluso e non ci sono candidature da valutare.' : 'Nessuna candidatura ricevuta per ora.'}</p>}
  </section>
 </section>;
}
