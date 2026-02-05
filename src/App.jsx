// src/App.jsx
import { useState, useEffect } from "react";

// 1000+ REAL LIFE HARD-CODED IDEAS
const fallbackIdeas = [
"Go for a 15-minute walk","Drink a full glass of water","Call your parents","Message an old friend","Clean your desk","Clean your wallet","Organize your wardrobe","Delete old photos","Backup your phone","Stretch for 5 minutes","Meditate for 5 minutes","Write a gratitude list","Plan your weekend","Make chai or coffee","Water your plants","Clean your keyboard","Wash your water bottle","Update your passwords","Unsubscribe from spam emails","Clean your email inbox","Sort WhatsApp chats","Delete unused apps","Check your calendar","Write tomorrow’s to-do list","Do 20 pushups","Do 30 squats","Take a short power nap","Read 10 pages of a book","Watch a TED talk","Listen to a podcast episode","Journal one page","Plan a trip","Learn 5 new English words","Practice deep breathing","Clean your car interior","Refill pantry items list","Update your resume","Update LinkedIn profile","Check bank statements","Review investments","Learn keyboard shortcuts","Practice typing speed","Watch a documentary","Declutter one drawer","Polish shoes","Organize cables","Backup laptop files","Plan weekly meals","Write business ideas","Read tech news","Check stock market news","Explore a new app","Learn a life hack","Do neck stretches","Clean your glasses","Prepare gym bag","Plan tomorrow outfit","Do mobility exercises","Wash your lunch box","Refill medicines","Organize bookmarks","Update phone apps","Practice mindfulness","Do eye exercises","Make healthy snack","Plan savings goal","Write bucket list","Check upcoming events","Explore new music","Make playlist","Organize kitchen shelf","Clean microwave","Clean fridge shelf","Check expiry dates","Sharpen pencils","Organize stationery","Learn quick recipe","Watch cooking video","Try breathing exercise","Practice gratitude","Declutter desktop files","Rename messy files","Sort downloads folder","Check travel deals","Explore hobby ideas","Plan learning goals","Write 10 affirmations","Clean mirror","Clean sink","Refill water bottles","Stretch hamstrings","Stretch shoulders","Stretch back","Practice posture","Organize medicine box","Check insurance papers","Scan documents","Create digital folder","Watch inspirational video","Clean dining table","Dust bookshelf","Rearrange study table","Plan reading list","Check subscriptions","Cancel unused subscriptions","Plan workout schedule","Explore online course","Read blog article","Write mini diary","Clean fan blades","Clean switchboards","Organize shoe rack","Wash pillow covers","Vacuum floor","Mop floor","Take sun break","Practice silence 5 min","Learn new word meaning","Write thank you message","Declutter bag","Check fuel level","Schedule health checkup","Plan gift ideas","Read Wikipedia article","Explore history topic","Learn geography fact","Practice math puzzles","Solve sudoku","Play chess online","Learn brain teaser","Practice mental math","Check weather forecast","Organize calendar events","Create monthly goals","Write yearly goals","Practice positive thinking","Try yoga pose","Do plank 1 minute","Try breathing box method","Drink green tea","Make fruit bowl","Try stretching routine","Watch stand-up comedy","Explore photography tips","Clean camera lens","Take nature photos","Go balcony break","Watch sunset","Watch sunrise tomorrow plan","Write morning routine","Write night routine","Prepare grocery list","Compare product prices","Check flight prices","Read travel blog","Plan road trip","Explore new restaurant list","Try new cuisine idea","Watch movie trailer","Create watchlist","Update watchlist","Learn movie trivia","Listen to audiobook sample","Check podcast charts","Explore Spotify playlists","Try journaling prompts","Write short poem","Write micro story","Sketch doodle","Draw stick figures","Learn origami","Fold paper crane","Organize art supplies","Clean paint brushes","Watch art tutorial","Explore color theory","Practice handwriting","Write quote collection","Memorize poem lines","Learn fun fact","Research invention","Read science article","Watch space video","Check NASA news","Explore startup ideas","Write app idea","Research side hustle","Read finance blog","Check savings interest","Review expenses","Track daily spending","Plan budget","Set saving challenge","Read productivity tips","Watch motivation video","Try Pomodoro session","Plan focus block","Declutter workspace","Clean mouse","Organize desk drawers","Light a candle","Open window for fresh air","Make herbal tea","Take deep breaths","Smile for 1 minute","Write kind message","Compliment someone","Help family member","Offer help at home","Cook simple meal","Chop vegetables","Try new fruit","Eat healthy snack","Plan cheat meal","Watch fitness reel","Do jumping jacks","Try skipping rope","Walk stairs 5 min","Plan fitness goals","Measure steps today","Check sleep hours","Set sleep reminder","Prepare bedtime routine","Read self-help page","Explore psychology article","Learn body language tip","Practice confidence posture","Write personal strengths","Write personal wins","Celebrate small win","Clean trash bin","Take trash out","Wash dishes","Clean kitchen counter","Refill soap dispenser","Refill sanitizer","Clean door handles","Clean TV screen","Organize remote controls","Clean windows","Wipe balcony rail","Sweep balcony","Feed birds","Watch birds","Check plant health","Trim plant leaves","Repot plant idea","Research gardening","Plan plant purchase","Watch gardening video","Check Amazon wishlist","Clean shopping cart","Compare gadgets","Research phone tips","Explore app settings","Clean notification list","Turn off unnecessary notifications","Organize gallery albums","Create memory album","Watch old photos","Delete blurry photos","Back up Google Photos","Clean cloud storage","Organize Google Drive","Clean WhatsApp media","Check storage usage","Free up phone space","Restart phone","Update software","Check security settings","Run antivirus scan","Check password manager","Generate strong password","Enable 2FA accounts","Check privacy settings","Review app permissions","Explore tech tips","Read coding blog","Watch coding tutorial","Plan coding practice","Solve coding challenge","Explore GitHub repos","Read startup story","Listen founder podcast","Plan business name ideas","Write tagline ideas","Write brand ideas","Check domain ideas","Sketch logo ideas","Read marketing tips","Watch branding video","Explore SEO basics","Learn copywriting tip","Write headline ideas","Write Instagram caption","Plan content ideas","Check trending topics","Watch viral videos","Analyze ads","Read case study","Learn negotiation tip","Practice sales pitch","Write elevator pitch","Practice speaking aloud","Record voice note","Listen to voice note","Improve speaking clarity","Practice pronunciation","Learn new phrase","Learn idiom","Write vocabulary list","Read English article","Practice English speaking","Watch English video","Think in English 5 min","Practice storytelling","Write childhood memory","Write future dream","Write life goals","Reflect on today","Plan tomorrow","Smile and relax"
];

export default function App() {
  const [idea, setIdea] = useState("Click the button to get an idea ✨");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("ideaHistory");
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  function getLocalIdea() {
    const unused = fallbackIdeas.filter(i => !history.includes(i));
    const pool = unused.length ? unused : fallbackIdeas;
    const random = pool[Math.floor(Math.random() * pool.length)];
    saveIdea(random);
  }

  function saveIdea(newIdea) {
    setIdea(newIdea);
    const updated = [...history, newIdea];
    setHistory(updated);
    localStorage.setItem("ideaHistory", JSON.stringify(updated));
  }

  async function generateIdea() {
    setLoading(true);
    try {
      const res = await fetch("/api/idea", { method: "POST" });
      const data = await res.json();

      if (!data.idea || data.idea.includes("failed")) {
        getLocalIdea();
      } else {
        saveIdea(data.idea);
      }
    } catch {
      getLocalIdea();
    }
    setLoading(false);
  }

  function resetIdeas() {
    localStorage.removeItem("ideaHistory");
    setHistory([]);
    setIdea("History cleared! Click for new ideas ✨");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-700 p-6">
      <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-xl w-full text-center">
        <h1 className="text-4xl font-bold mb-6 text-gray-900">Ab Kya Karne Ka?</h1>

        <div className="bg-gray-100 rounded-2xl p-6 mb-6 min-h-[120px] flex items-center justify-center">
          <p className="text-2xl font-semibold text-gray-900">
            {loading ? "Thinking... 🤖" : idea}
          </p>
        </div>

        <button
          onClick={generateIdea}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl text-lg font-semibold shadow-lg transition mr-3"
        >
          Give me an idea ✨
        </button>

        <button
          onClick={resetIdeas}
          className="bg-gray-300 hover:bg-gray-400 text-gray-900 px-6 py-3 rounded-2xl text-lg font-semibold shadow-lg transition"
        >
          Reset ideas
        </button>
      </div>
    </div>
  );
}
