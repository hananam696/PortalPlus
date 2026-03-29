import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q') || '';
    const type = searchParams.get('type') || 'all';
    const category = searchParams.get('category') || 'all';

    if (!q.trim()) {
      return NextResponse.json({ 
        success: true, 
        results: [],
        grouped: { rental: [], certificates: [] }
      });
    }

    const searchTerm = q.toLowerCase();
    const results = [];

    // Your rental items data (books)
    const books = [
      { id: 1, title: "Data Structures & Algorithms", course: "CS204", status: "Available", category: "books" },
      { id: 2, title: "Engineering Mathematics", course: "MATH201", status: "Rented", category: "books" },
      { id: 3, title: "Database Systems", course: "CS310", status: "Available", category: "books" },
      { id: 4, title: "Web Development with React", course: "CS320", status: "Available", category: "books" },
      { id: 5, title: "Artificial Intelligence", course: "CS440", status: "Available", category: "books" },
      { id: 6, title: "Python Programming", course: "CS101", status: "Available", category: "books" },
      { id: 7, title: "JavaScript Essentials", course: "CS110", status: "Available", category: "books" },
      { id: 8, title: "Machine Learning Basics", course: "CS450", status: "Rented", category: "books" },
    ];
    
    // Your rental items data (calculators)
    const calculators = [
      { id: 101, title: "Casio FX-991ES Plus", course: "Engineering", status: "Available", category: "calculators" },
      { id: 102, title: "Texas Instruments TI-84", course: "Statistics", status: "Rented", category: "calculators" },
      { id: 103, title: "Casio FX-82MS", course: "General", status: "Available", category: "calculators" },
      { id: 104, title: "HP Prime Graphing Calculator", course: "Advanced Math", status: "Available", category: "calculators" },
    ];
    
    // Your certificates data
    const certificates = [
      { id: 1, title: "Sustainability Workshop", type: "Workshop", date: "2024-03-12" },
      { id: 2, title: "Internship Completion", type: "Internship", date: "2023-08-30" },
      { id: 3, title: "Web Development Bootcamp", type: "Course", date: "2024-01-15" },
      { id: 4, title: "Python Programming Certificate", type: "Course", date: "2023-12-10" },
      { id: 5, title: "Hackathon Winner 2024", type: "Competition", date: "2024-02-20" },
      { id: 6, title: "Community Service Award", type: "Volunteer", date: "2023-11-05" },
    ];

    // 1. Search rental items (books and calculators)
    if (type === 'all' || type === 'rental') {
      let itemsToSearch = [];
      if (category === 'all') {
        itemsToSearch = [...books, ...calculators];
      } else if (category === 'books') {
        itemsToSearch = books;
      } else if (category === 'calculators') {
        itemsToSearch = calculators;
      }
      
      const matchedItems = itemsToSearch.filter(item => 
        item.title.toLowerCase().includes(searchTerm) ||
        item.course?.toLowerCase().includes(searchTerm)
      );
      
      matchedItems.forEach(item => {
        results.push({
          ...item,
          type: 'rental',
          // ✅ CORRECT URLS based on your routes
          url: `/rental-hub/${item.category === 'books' ? 'books' : 'calculators'}`,
        });
      });
    }

    // 2. Search certificates
    if (type === 'all' || type === 'certificates') {
      const matchedCerts = certificates.filter(cert =>
        cert.title.toLowerCase().includes(searchTerm) ||
        cert.type.toLowerCase().includes(searchTerm)
      );
      
      matchedCerts.forEach(cert => {
        results.push({
          ...cert,
          type: 'certificate',
          // ✅ CORRECT URL - your certificates page
          url: `/certificates`,
        });
      });
    }

    // Group results
    const groupedResults = {
      rental: results.filter(r => r.type === 'rental'),
      certificates: results.filter(r => r.type === 'certificate'),
    };

    return NextResponse.json({
      success: true,
      results: results.slice(0, 20),
      grouped: groupedResults,
      query: q,
      total: results.length,
    });

  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Search failed. Please try again.' 
    }, { status: 500 });
  }
}