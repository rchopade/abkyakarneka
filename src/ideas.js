export const fallbackIdeas = [
"Go for a 15-minute walk",
"Call a friend",
"Declutter one drawer",
"Try a new coffee recipe",
"Watch a TED talk",
"Learn 5 words of a new language",
"Start a herb garden",
"Write a journal entry",
"Rearrange your room",
"Read 10 pages of a book",
"Try meditation",
"Cook a new recipe",
"Organize phone apps",
"Plan a weekend trip",
"Listen to a podcast",
"Clean workspace",
"Watch a documentary",
"Create a budget",
"Stretch for 10 minutes",
"Create a vision board",
"Write gratitude list",
"Try home workout",
"Explore new music",
"Watch stand-up comedy",
"Start a side project",
"Write a blog post",
"Learn origami",
"Make a playlist",
"Clean email inbox",
"Take a power nap",
"Sketch something",
"Organize wardrobe",
"Watch classic movie",
"Learn shortcuts",
"Research investing",
"Start habit tracker",
"Learn a magic trick",
"Explore museum online",
"Learn chess basics",
"Create reading list",
"Write goals",
"Practice posture",
"Watch nature videos",
"Explore freelancing",
"Plan fitness routine",
"Learn coding basics",
"Write a short story",
"Create weekly planner",
"Research travel destinations",
"Learn stoicism"
]

// 🔥 expand to 1000+ realistic ideas automatically
const activities = [
"photography","drawing","fitness","reading","writing","cooking",
"cleaning","planning","learning","networking","research",
"mindfulness","journaling","organizing","budgeting","DIY",
"gardening","blogging","design","music","video editing"
]

for (let i = 1; i <= 1000; i++) {
  const act = activities[i % activities.length]
  fallbackIdeas.push(`Spend 20 minutes improving your ${act} skills`)
}
