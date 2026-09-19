import { Handshake, Check } from 'lucide-react';
export default function ProjectPost({ requested, onCollaborate }) { return <button className={`collaborate ${requested ? 'requested' : ''}`} disabled={requested} onClick={onCollaborate}>{requested ? <Check size={19}/> : <Handshake size={21}/>}<span>{requested ? 'Richiesta inviata' : 'Collabora'}</span></button>; }
