export default function PortfolioPost({ tags }) { return <div className="tags">{tags.map(tag => <span className="tag" key={tag}>{tag}</span>)}</div>; }
