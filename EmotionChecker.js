import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

// Replace the entire array with your new list of emotions
const validEmotions = [
  'abandoned','acceptance','accepted','admiration','affectionate','aggressive','aggressiveness','amazed',
  'amazement','anger','angry','annoyance','annoyed','anxious','apathetic','appalled','apprehension',
  'anticipation','aroused','ashamed','astonished','awe','awful','bad','betrayed','bitter','bored','boredom',
  'brave','busy','caring','cheeky','confident','confused','contempt','content','courageous','creative',
  'critical','curious','depressed','despair','detestable','devastated','disappointed','disapproving',
  'disapproval','disillusioned','dismissive','dismayed','disgust','disgusted','distant','distraction','eager',
  'ecstasy','embarrassed','empty','energetic','excluded','excited','exposed','fear','fearful','fragile','free',
  'frightened','frustrated','furious','guilty','grateful','grief','happy','helpless','hesitant','hopeful',
  'horrified','hostile','hurt','humiliated','indifferent','indignant','infuriated','insecure','inquisitive',
  'inspired','insignificant','interest','interested','intimate','isolated','jealous','joy','joyful','judgmental',
  'let down','loathing','lonely','love','loved','loving','M','mad','nauseated','nervous','numb','optimism',
  'optimistic','out of control','overwhelmed','peaceful','pensiveness','persecuted','perplexed','playful',
  'powerless','powerful','pressured','proud','provoked','rage','remorse','remorseful','resentful','respected',
  'revolted','ridiculed','rushed','sad','sadness','scared','sensitive','serenity','skeptical','shocked',
  'sleepy','stressed','submission','successful','surprise','surprised','thankful','terror','threatened',
  'tired','trust','trusting','unfocused','unwanted','valued','victimized','vigilance','violated','vulnerable',
  'weak','withdrawn','worried','worthless'
];

const EmotionChecker = () => {
  const [currentEmotion, setCurrentEmotion] = useState('');
  const [enteredEmotions, setEnteredEmotions] = useState(new Set());
  const [showResults, setShowResults] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  const handleInputChange = (e) => {
    const input = e.target.value;
    setCurrentEmotion(input);

    // Check if the input ends with a space or comma
    if (input.endsWith(' ') || input.endsWith(',')) {
      const emotion = input.slice(0, -1).toLowerCase().trim();
      
      if (emotion === '') return;

      if (enteredEmotions.has(emotion)) {
        setErrorMessage(`You've already entered this emotion!`);
        setShowError(true);
        setTimeout(() => setShowError(false), 3000);
      } else if (validEmotions.includes(emotion)) {
        setEnteredEmotions(new Set([...enteredEmotions, emotion]));
        setShowError(false);
      } else {
        setErrorMessage(`${capitalizeFirstLetter(emotion)} is not an emotion`);
        setShowError(true);
        setTimeout(() => setShowError(false), 3000);
      }
      setCurrentEmotion('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const emotion = currentEmotion.toLowerCase().trim();
      
      if (emotion === '') return;

      if (enteredEmotions.has(emotion)) {
        setErrorMessage(`You've already entered this emotion!`);
        setShowError(true);
        setTimeout(() => setShowError(false), 3000);
      } else if (validEmotions.includes(emotion)) {
        setEnteredEmotions(new Set([...enteredEmotions, emotion]));
        setShowError(false);
      } else {
        setErrorMessage(`${capitalizeFirstLetter(emotion)} is not an emotion`);
        setShowError(true);
        setTimeout(() => setShowError(false), 3000);
      }
      setCurrentEmotion('');
    }
  };

  const calculatePercentage = () => {
    return ((enteredEmotions.size / validEmotions.length) * 100).toFixed(1);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <div className="flex items-center justify-center mb-6">
            <h1 className="text-2xl font-bold">TrueMe</h1>
          </div>
          <CardTitle className="text-xl text-center">
            How many emotions do you know?
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!showResults ? (
            <div className="space-y-4">
              <div className="space-y-4">
                <Input
                  type="text"
                  value={currentEmotion}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  placeholder="Type an emotion and press Enter or Space..."
                  className="w-full"
                />
                <Button 
                  onClick={() => setShowResults(true)}
                  className="w-full"
                >
                  I don't know any more emotions
                </Button>
              </div>

              {showError && (
                <Alert variant="destructive">
                  <AlertDescription>{errorMessage}</AlertDescription>
                </Alert>
              )}

              <div className="mt-4">
                <h3 className="font-semibold mb-2">
                  Emotions you've named ({enteredEmotions.size}):
                </h3>
                <div className="flex flex-wrap gap-2">
                  {Array.from(enteredEmotions).map((emotion) => (
                    <span
                      key={emotion}
                      className="bg-blue-100 text-blue-800 px-2 py-1 rounded"
                    >
                      {emotion}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6 text-center">
              <div>
                <h2 className="text-xl font-bold mb-2">Your Results</h2>
                <p className="text-4xl font-bold text-blue-600">
                  {calculatePercentage()}%
                </p>
                <p className="mt-2">
                  You named {enteredEmotions.size} out of {validEmotions.length} emotions!
                </p>
              </div>
              
              <div className="space-y-4">
                <p className="text-lg">
                  Want to learn more about understanding and managing your emotions?
                </p>
                <Button 
                  onClick={() => alert("Sign up functionality would go here!")}
                  className="w-full"
                >
                  Sign Up to Learn More
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EmotionChecker;
