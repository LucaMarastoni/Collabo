import { CheckCircle2 } from 'lucide-react';
export default function Toast({ message }) { return <div className={`toast ${message ? 'visible' : ''}`} role="status" aria-live="polite">{message && <><CheckCircle2 size={19}/><span>{message}</span></>}</div>; }
