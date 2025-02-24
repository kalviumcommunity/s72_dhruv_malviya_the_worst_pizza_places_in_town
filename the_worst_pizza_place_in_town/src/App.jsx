import React from "react";
import { Star, Frown } from "lucide-react";
import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button"; 



const App = () => {
  const review = {
    name: "Disaster Slice Pizza",
    rating: 0.5,
    reviewText: "I've had frozen pizzas with more personality. The crust tastes like cardboard, the cheese is plastic, and the sauce? What sauce?",
    image: "https://cdn.vox-cdn.com/thumbor/9mAiwTiOzQFIXZJwIB6JXcY3Yiw=/1400x1050/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/9784383/DP54i2GXkAACY0a.jpg", // Random pizza image
  };

  return (
    <Card className="max-w-md mx-auto p-4 border border-red-500 shadow-lg rounded-2xl bg-gray-900 text-white">
      <img src={review.image} alt="Terrible Pizza" className="w-full h-40 object-cover rounded-xl mb-4" />
      <CardContent>
        <h2 className="text-xl font-bold text-red-400">{review.name}</h2>
        <div className="flex items-center mt-2 text-yellow-500">
          {[...Array(Math.floor(review.rating))].map((_, i) => (
            <Star key={i} size={18} />
          ))}
          <Frown size={18} className="text-red-500 ml-1" />
          <span className="ml-2 text-sm">({review.rating}/5)</span>
        </div>
        <p className="text-gray-300 mt-3">{review.reviewText}</p>
        <Button variant="destructive" className="mt-4 w-full">Avoid at All Costs</Button>
      </CardContent>
    </Card>
  );
};

export default App;
