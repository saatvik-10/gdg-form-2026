export const QUESTIONS: Record<string, string[]> = {
  tech: [
    "Do you have a Github profile? If yes, please provide your Github handle else write nil.",
    "What fields are you interested in tech?",
    "What fields have you already explored?",
    "Describe a technical problem you faced while working on a project and how you solved it.",
    "What is your opinion on AI Slop?",
  ],

  pr: [
    "Why do you want to join the GDG PR & Sponsorship team specifically?",
    "Describe yourself in three words and explain why you chose them.",
    "How do you handle it when you ask for help or a favor and get a \"no\"?",
    "On a scale of 1–10, how comfortable are you speaking in front of a crowd, and why?",
    "Pitch your favorite hobby or movie to someone who has never heard of it.",
  ],

  management: [
    "Management often involves coordinating with multiple teams simultaneously. How would you ensure that everyone stays aligned and deadlines are met?",
    "Tell us about a time when you took responsibility for organizing, coordinating, or leading something. What was your role and what was the outcome?",
    "How would you prioritize the following if they all required your attention at the same time?\n\n- An event task with a deadline in 1 hour\n- A team member asking for help\n- A last-minute request from another department\n- A task assigned to you for next week",
    "How do you handle conflicts or disagreements between team members while ensuring that the work is not affected?",
    "What type of personality or work style do you find most challenging to work with, and how do you adapt your own approach to ensure the goal gets met?",
  ],

  marketing: [
    "Your event is 3 days away and registrations are much lower than expected. You’ve already posted on Instagram and WhatsApp. What would you do next?",
    "A reel you spent hours making gets 800 views, while a simple 10-second reel made in 20 minutes gets 15,000 views. What would you do after seeing this result?",
    "You are given ₹2,000 and 5 days to promote a college event. You cannot spend the whole amount on Instagram ads. How would you use the money?",
    "Someone suggests a marketing idea you don’t like, but most of the team thinks it could work. How would you handle the situation?",
    "Imagine the event is tomorrow, there is almost no budget, and only 5 people are available from the marketing team. What is one realistic idea you would execute today to get students talking about it?",
  ],

  media: [
    "What media, editing, or content creation tools are you comfortable using (e.g., Premiere Pro, After Effects, CapCut, Photoshop, Lightroom, Canva)?",
    "Rate your current skill level in media and content creation from 0 to 10.",
    "Apart from visual media, what other content skills do you have? (e.g., content writing, script writing, copywriting, storytelling, captions, photography, videography, etc.)",
    "If you were covering a GDG event, how would you capture its energy and turn it into engaging content that makes people want to be part of the next event?",
    "Show us what you can create by sharing links to your portfolio or previous work. This can include reels, video edits, photography, social media content, written content, or any other creative work. Also, mention any additional skills you bring to the media team!"
  ],

  design: [
    "What kind of design work do you enjoy creating the most, and why?",
    "What design tools are you familiar with?",
    "What is one designer/brand whose visual style you really like? Why?",
    "If you had to design a poster for a GDG event, what style, colors, and layout would you choose and why?",
    "Share links to your portfolio or any design work you’ve created before. Mention any tools or skills you use regularly."
  ]
};

export const DOMAIN_LABELS: Record<string, string> = {
  tech: "Technical",
  pr: "PR & Sponsorship",
  management: "Management",
  marketing: "Marketing",
  media: "Media",
  design: "Design"
};

export const EXAMPLES: Record<string, string[]> = {
  tech: [
    "e.g. github.com/yourusername or nil",
    "e.g. Web development, App development, Machine Learning, Cloud computing, etc.",
    "e.g. I've built a few React projects and explored basics of Python for data analysis.",
    "e.g. I would help organize workshops, contribute to open-source projects, and mentor juniors.",
  ],

  pr: [
    "e.g. Strong communication skills, networking ability, and confidence in cold outreach.",
    "e.g. I interned at a startup handling their social media outreach for 3 months.",
    "e.g. I would research the company's values first, then pitch a mutually beneficial collaboration.",
    "e.g. linkedin.com/in/yourname",
  ],

  management: [
    "e.g. I led a college fest committee of 15 members and coordinated logistics.",
    "e.g. I weigh pros and cons, consult the team, and take a call based on data and gut feeling.",
    "e.g. Clear communication, empathy, and the ability to delegate effectively.",
    "e.g. I speak to both members privately first, then mediate a joint conversation to find common ground.",
  ],

  marketing: [
    "e.g. I want to build real-world marketing experience and bring fresh, creative campaign ideas.",
    "e.g. Traditional marketing uses print/TV, digital marketing uses online channels — digital works better for students since it's low-cost and targeted.",
    "e.g. I would run targeted Instagram ads, partner with college influencers, and email local businesses for sponsorships.",
    "e.g. Spotify Wrapped campaign — loved how personalized and shareable it was.",
  ],

  media: [
    "e.g. I use Premiere Pro, CapCut, and Canva for editing and social content.",
    "e.g. I’d rate myself 8/10 in editing and content creation.",
    "e.g. I create captions, short scripts, and social media posts alongside video edits.",
    "e.g. I’d capture the crowd energy through quick B-roll, reactions, and short interviews.",
    "e.g. drive.google.com/your-portfolio-link",
  ],

  design: [
    "e.g. I enjoy poster and branding design the most because it combines visuals, messaging, and storytelling.",
    "e.g. I make the content easy to read by keeping the hierarchy clean, using contrast, and limiting clutter.",
    "e.g. I designed a campus poster campaign for a tech fest and improved engagement by simplifying the message.",
    "e.g. I’d use a bold neon palette, strong contrast, and one clear CTA to make it stand out.",
    "e.g. behance.net/yourprofile or dribbble.com/yourprofile"
  ]
};