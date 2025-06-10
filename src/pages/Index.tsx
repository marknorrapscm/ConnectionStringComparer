
import { useState, useRef } from 'react';
import { Check, X, Copy, AlertCircle } from 'lucide-react';
import ConnectionStringTextarea from '../components/ConnectionStringTextarea';
import ComparisonResult from '../components/ComparisonResult';
import { validateConnectionString, compareConnectionStrings } from '../utils/connectionStringUtils';

const Index = () => {
  const [leftString, setLeftString] = useState('');
  const [rightString, setRightString] = useState('');
  const [leftValid, setLeftValid] = useState<boolean | null>(null);
  const [rightValid, setRightValid] = useState<boolean | null>(null);

  const handleLeftChange = (value: string) => {
    setLeftString(value);
    setLeftValid(value ? validateConnectionString(value) : null);
  };

  const handleRightChange = (value: string) => {
    setRightString(value);
    setRightValid(value ? validateConnectionString(value) : null);
  };

  const isMatch = leftString && rightString && leftString === rightString;
  const bothValid = leftValid && rightValid;
  const showComparison = leftString.length > 0 || rightString.length > 0;

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Connection String Comparator
          </h1>
          <div className="flex items-center justify-center gap-2 mt-2 text-sm text-gray-400">
            <AlertCircle size={16} />
            <span>Nothing is saved - all data stays in your browser</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <ConnectionStringTextarea
            label="Connection String 1"
            value={leftString}
            onChange={handleLeftChange}
            isValid={leftValid}
            placeholder="Click here and your clipboard will be pasted automatically..."
          />
          <ConnectionStringTextarea
            label="Connection String 2"
            value={rightString}
            onChange={handleRightChange}
            isValid={rightValid}
            placeholder="Click here and your clipboard will be pasted automatically..."
          />
        </div>

        {showComparison && (
          <ComparisonResult
            isMatch={isMatch}
            bothValid={bothValid}
            leftLength={leftString.length}
            rightLength={rightString.length}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
