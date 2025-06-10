
import { useRef, useState } from 'react';
import { Check, X, ClipboardPaste, Eraser } from 'lucide-react';
import { Button } from './ui/button';

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
  const [justCleared, setJustCleared] = useState(false);

  const handleFocus = async () => {
    setIsFocused(true);
    
    // Don't auto-paste if we just cleared
    if (justCleared) {
      setJustCleared(false);
      return;
    }
    
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

  const handlePaste = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      if (clipboardText && clipboardText.trim()) {
        onChange(clipboardText.trim());
      }
    } catch (err) {
      console.log('Clipboard access denied or unavailable');
    }
  };

  const handleClear = () => {
    setJustCleared(true);
    onChange('');
    textareaRef.current?.focus();
  };

  const getValidationIcon = () => {
    if (isValid === null) return null;
    return isValid ? (
      <Check className="text-emerald-400" size={20} />
    ) : (
      <X className="text-red-400" size={20} />
    );
  };

  const getBorderColor = () => {
    if (isFocused) return 'border-blue-400 shadow-lg shadow-blue-400/25 ring-2 ring-blue-400/20';
    if (isValid === true) return 'border-emerald-400 shadow-lg shadow-emerald-400/25';
    if (isValid === false) return 'border-red-400 shadow-lg shadow-red-400/25';
    return 'border-gray-600';
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-white">
          {label}
        </label>
        <div className="flex items-center gap-2">
          {getValidationIcon()}
          {isValid && (
            <span className="text-xs text-emerald-400">Valid connection string</span>
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
            w-full h-32 px-4 py-3 bg-gray-800 border-2 text-white 
            placeholder-gray-400 rounded-lg transition-all duration-200 resize-none
            focus:outline-none ${getBorderColor()}
          `}
        />
        
        {!value && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="flex items-center gap-2 text-gray-400">
              <ClipboardPaste size={20} />
              <span className="text-sm">Click to auto-paste from clipboard</span>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePaste}
            className="flex items-center gap-2 bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white hover:border-blue-400 hover:shadow-lg hover:shadow-blue-400/25 transition-all duration-200"
          >
            <ClipboardPaste size={16} />
            Paste
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleClear}
            className="flex items-center gap-2 bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white hover:border-red-400 hover:shadow-lg hover:shadow-red-400/25 transition-all duration-200"
            disabled={!value}
          >
            <Eraser size={16} />
            Clear
          </Button>
        </div>
        <div className="text-xs text-gray-400">
          {value.length > 0 && `${value.length} characters`}
        </div>
      </div>
    </div>
  );
};

export default ConnectionStringTextarea;
