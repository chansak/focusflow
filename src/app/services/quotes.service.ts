import { Injectable, signal, computed } from '@angular/core';

export interface MotivationalQuote {
  text: string;
  author: string;
  category: 'productivity' | 'focus' | 'success' | 'motivation';
}

@Injectable({
  providedIn: 'root'
})
export class QuotesService {
  private readonly quotes: MotivationalQuote[] = [
    {
      text: "The way to get started is to quit talking and begin doing.",
      author: "Walt Disney",
      category: "productivity"
    },
    {
      text: "Focus on being productive instead of busy.",
      author: "Tim Ferriss",
      category: "focus"
    },
    {
      text: "It is during our darkest moments that we must focus to see the light.",
      author: "Aristotle",
      category: "focus"
    },
    {
      text: "Productivity is never an accident. It is always the result of a commitment to excellence.",
      author: "Paul J. Meyer",
      category: "productivity"
    },
    {
      text: "The successful warrior is the average man with laser-like focus.",
      author: "Bruce Lee",
      category: "focus"
    },
    {
      text: "Time is what we want most, but what we use worst.",
      author: "William Penn",
      category: "productivity"
    },
    {
      text: "You may delay, but time will not.",
      author: "Benjamin Franklin",
      category: "productivity"
    },
    {
      text: "The key is not to prioritize what's on your schedule, but to schedule your priorities.",
      author: "Stephen Covey",
      category: "productivity"
    },
    {
      text: "Concentrate all your thoughts upon the work at hand. The sun's rays do not burn until brought to a focus.",
      author: "Alexander Graham Bell",
      category: "focus"
    },
    {
      text: "Success is the sum of small efforts repeated day in and day out.",
      author: "Robert Collier",
      category: "success"
    },
    {
      text: "Don't watch the clock; do what it does. Keep going.",
      author: "Sam Levenson",
      category: "motivation"
    },
    {
      text: "The future depends on what you do today.",
      author: "Mahatma Gandhi",
      category: "motivation"
    },
    {
      text: "Start where you are. Use what you have. Do what you can.",
      author: "Arthur Ashe",
      category: "motivation"
    },
    {
      text: "It's not about time, it's about choices. How are you spending your choices?",
      author: "Beverly Adamo",
      category: "productivity"
    },
    {
      text: "Your limitation—it's only your imagination.",
      author: "Unknown",
      category: "motivation"
    },
    {
      text: "Push yourself, because no one else is going to do it for you.",
      author: "Unknown",
      category: "motivation"
    },
    {
      text: "Great things never come from comfort zones.",
      author: "Unknown",
      category: "motivation"
    },
    {
      text: "Dream it. Wish it. Do it.",
      author: "Unknown",
      category: "motivation"
    },
    {
      text: "Success doesn't just find you. You have to go out and get it.",
      author: "Unknown",
      category: "success"
    },
    {
      text: "The harder you work for something, the greater you'll feel when you achieve it.",
      author: "Unknown",
      category: "success"
    }
  ];

  private readonly currentQuoteIndex = signal<number>(0);

  public readonly currentQuote = computed<MotivationalQuote>(() => {
    return this.quotes[this.currentQuoteIndex()];
  });

  public readonly focusQuotes = computed<MotivationalQuote[]>(() => {
    return this.quotes.filter(quote => quote.category === 'focus');
  });

  public readonly productivityQuotes = computed<MotivationalQuote[]>(() => {
    return this.quotes.filter(quote => quote.category === 'productivity');
  });

  constructor() {
    // Set initial random quote
    this.setRandomQuote();
    
    // Change quote every 30 seconds
    setInterval(() => {
      this.setRandomQuote();
    }, 30000);
  }

  public setRandomQuote(): void {
    const randomIndex = Math.floor(Math.random() * this.quotes.length);
    this.currentQuoteIndex.set(randomIndex);
  }

  public getQuoteByCategory(category: MotivationalQuote['category']): MotivationalQuote {
    const categoryQuotes = this.quotes.filter(quote => quote.category === category);
    const randomIndex = Math.floor(Math.random() * categoryQuotes.length);
    return categoryQuotes[randomIndex];
  }

  public nextQuote(): void {
    const nextIndex = (this.currentQuoteIndex() + 1) % this.quotes.length;
    this.currentQuoteIndex.set(nextIndex);
  }

  public previousQuote(): void {
    const prevIndex = this.currentQuoteIndex() === 0 
      ? this.quotes.length - 1 
      : this.currentQuoteIndex() - 1;
    this.currentQuoteIndex.set(prevIndex);
  }
}