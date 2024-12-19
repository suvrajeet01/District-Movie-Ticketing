import React, { useState } from 'react';
import { ChevronLeft, MapPin, Search, Calendar, Clock, Utensils, Plus, Minus, CreditCard, Heart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const MovieApp = () => {
  const [step, setStep] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);

  const movies = [
    { 
      id: 1, 
      title: "Dune: Part Two", 
      rating: "8.9/10",
      language: "English",
      format: "IMAX 3D",
      img: "/api/placeholder/160/240"
    },
    { 
      id: 2, 
      title: "Kung Fu Panda 4", 
      rating: "7.8/10",
      language: "English",
      format: "2D",
      img: "/api/placeholder/160/240"
    }
  ];

  const showtimes = [
    "10:30 AM",
    "1:15 PM",
    "4:00 PM",
    "7:30 PM",
    "10:45 PM"
  ];

  const renderHomeScreen = () => (
    <div className="p-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-gray-600" />
          <span className="font-medium">Mumbai, MH</span>
        </div>
        <Search className="w-5 h-5 text-gray-600" />
      </div>

      <div className="flex gap-4 mb-6 overflow-x-auto">
        <Card className="min-w-[100px] bg-blue-500 text-white">
          <CardContent className="p-3 text-center">
            <div className="text-sm">TODAY</div>
            <div className="text-xl font-bold">20</div>
          </CardContent>
        </Card>
        {[21, 22, 23].map(date => (
          <Card key={date} className="min-w-[100px]">
            <CardContent className="p-3 text-center">
              <div className="text-sm text-gray-600">DEC</div>
              <div className="text-xl font-bold">{date}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <h2 className="text-xl font-bold mb-4">Now Showing</h2>
      <div className="grid grid-cols-2 gap-4">
        {movies.map(movie => (
          <Card 
            key={movie.id}
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => {
              setSelectedMovie(movie);
              setStep(2);
            }}
          >
            <CardContent className="p-3">
              <img 
                src={movie.img} 
                alt={movie.title}
                className="w-full rounded-lg mb-2"
              />
              <h3 className="font-medium text-sm mb-1">{movie.title}</h3>
              <div className="text-xs text-gray-600">
                {movie.language} • {movie.format}
              </div>
              <div className="text-xs text-gray-600">{movie.rating}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderShowtimeScreen = () => (
    <div className="p-4">
      <div className="flex items-center mb-6">
        <ChevronLeft 
          className="w-6 h-6 mr-2 cursor-pointer" 
          onClick={() => setStep(1)}
        />
        <h2 className="text-xl font-bold">{selectedMovie?.title}</h2>
      </div>

      <div className="flex gap-4 mb-6">
        <Card className="flex-1">
          <CardContent className="p-3 flex items-center justify-center gap-2">
            <Calendar className="w-4 h-4" />
            <span className="text-sm">Dec 20</span>
          </CardContent>
        </Card>
        <Card className="flex-1">
          <CardContent className="p-3 flex items-center justify-center gap-2">
            <Clock className="w-4 h-4" />
            <span className="text-sm">Evening</span>
          </CardContent>
        </Card>
        <Card className="flex-1">
          <CardContent className="p-3 flex items-center justify-center gap-2">
            <Utensils className="w-4 h-4" />
            <span className="text-sm">Food</span>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {['INOX Megaplex, Mumbai', 'PVR Icon, BKC', 'Cinepolis, Andheri'].map((theater, idx) => (
          <Card key={idx}>
            <CardContent className="p-4">
              <h3 className="font-medium mb-3">{theater}</h3>
              <div className="flex flex-wrap gap-3">
                {showtimes.map((time, timeIdx) => (
                  <button
                    key={timeIdx}
                    className="px-4 py-2 text-sm border rounded-full hover:bg-blue-50"
                    onClick={() => setStep(3)}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderSeatSelection = () => {
    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
    const seatsPerRow = 12;

    return (
      <div className="p-4">
        <div className="flex items-center mb-6">
          <ChevronLeft 
            className="w-6 h-6 mr-2 cursor-pointer" 
            onClick={() => setStep(2)}
          />
          <div>
            <h2 className="text-xl font-bold">{selectedMovie?.title}</h2>
            <div className="text-sm text-gray-600">INOX Megaplex • Dec 20 • 7:30 PM</div>
          </div>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg mb-6">
          <div className="w-full h-2 bg-gray-300 rounded-full mb-8" />
          
          <div className="grid gap-2">
            {rows.map(row => (
              <div key={row} className="flex items-center gap-2">
                <div className="w-6 text-center text-sm text-gray-600">{row}</div>
                <div className="flex gap-2 flex-1">
                  {Array.from({ length: seatsPerRow }).map((_, idx) => (
                    <button
                      key={idx}
                      className={`w-6 h-6 rounded ${
                        selectedSeats.includes(`${row}${idx + 1}`)
                          ? 'bg-blue-500'
                          : 'bg-white'
                      }`}
                      onClick={() => {
                        const seatId = `${row}${idx + 1}`;
                        setSelectedSeats(prev =>
                          prev.includes(seatId)
                            ? prev.filter(s => s !== seatId)
                            : [...prev, seatId]
                        );
                      }}
                    />
                  ))}
                </div>
                <div className="w-6 text-center text-sm text-gray-600">{row}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-sm text-gray-600">Premium (₹450)</div>
              <div className="font-medium">2 Tickets</div>
            </div>
            <div className="flex gap-2">
              <button className="p-2 rounded-full border"><Minus className="w-4 h-4" /></button>
              <button className="p-2 rounded-full border"><Plus className="w-4 h-4" /></button>
            </div>
          </div>

          <Card className="bg-blue-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Utensils className="w-4 h-4" />
                <span className="font-medium">Add Food & Beverages</span>
              </div>
              <p className="text-sm text-gray-600">Pre-book now to save more!</p>
            </CardContent>
          </Card>

          <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t">
            <div className="flex justify-between items-center mb-4">
              <div>
                <div className="text-sm text-gray-600">Total Amount</div>
                <div className="text-xl font-bold">₹900</div>
              </div>
              <button className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-full">
                <CreditCard className="w-4 h-4" />
                Proceed to Pay
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen">
      {step === 1 && renderHomeScreen()}
      {step === 2 && renderShowtimeScreen()}
      {step === 3 && renderSeatSelection()}
    </div>
  );
};

export default MovieApp;