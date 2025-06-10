
import { useRef, useState } from 'react';
import { Check, X, Clipboard } from 'lucide-react';

interface ConnectionStringTextareaProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  isValid: boolean | null;
  placeholder: string;
}

const ConnectionStringTextarea = ({ 
  label, 
  value, 
  onChange, 
  isValid, 
  placeholder 
}: ConnectionStringTextareaProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = async () => {
    setIsFocused(true);
    try {
      const clipboardText = await navigator.clipboard.readText();
      if (clipboardText && clipboardText.trim()) {
        onChange(clipboardText.trim());
      }
    } catch (err) {
      console.log('Clipboard access denied or unavailable');
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const getValidationIcon = () => {
    if (isValid === null) return null;
    return isValid ? (
      <Check className="text-green-400" size={20} />
    ) : (
      <X className="text-red-400" size={20} />
    );
  };

  const getBorderColor = () => {
    if (isFocused) return 'border-blue-400 ring-2 ring-blue-400/20';
    if (isValid === true) return 'border-green-400';
    if (isValid === false) return 'border-red-400';
    return 'border-slate-600';
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-slate-200">
          {label}
        </label>
        <div className="flex items-center gap-2">
          {getValidationIcon()}
          {isValid && (
            <span className="text-xs text-green-400">Valid connection string</span>
          )}
          {isValid === false && value && (
            <span className="text-xs text-red-400">Invalid format</span>
          )}
        </div>
      </div>
      
      <div className="relative">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          className={`
            w-full h-32 px-4 py-3 bg-slate-800/50 backdrop-blur-sm text-white 
            placeholder-slate-400 rounded-lg transition-all duration-200 resize-none
            focus:outline-none ${getBorderColor()}
          `}
        />
        
        {!value && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="flex items-center gap-2 text-slate-500">
              <Clipboard size={20} />
              <span className="text-sm">Click to auto-paste from clipboard</span>
            </div>
          </div>
        )}
      </div>

      <div className="text-xs text-slate-400">
        {value.length > 0 && `${value.length} characters`}
      </div>
    </div>
  );
};

export default ConnectionStringTextarea;
