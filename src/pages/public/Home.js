
import { Link } from "react-router-dom";


function Home() {
  
  
  return (
    <div className="home-page">
      
      <h1>Adventure is Calling - Are You Ready to Answer?</h1>
      <p>Explore and book amazing tours!</p>
      <button><Link to="/tours">View Tours</Link></button>
     
    </div>
  );
}
export default Home;
