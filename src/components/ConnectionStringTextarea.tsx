
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
    onChange('');
    textareaRef.current?.focus();
  };

  const getValidationIcon = () => {
    if (isValid === null) return null;
    return isValid ? (
      <Check className="text-green-500" size={20} />
    ) : (
      <X className="text-red-500" size={20} />
    );
  };

  const getBorderColor = () => {
    if (isFocused) return 'border-primary ring-2 ring-primary/20';
    if (isValid === true) return 'border-green-500';
    if (isValid === false) return 'border-red-500';
    return 'border-border';
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-foreground">
          {label}
        </label>
        <div className="flex items-center gap-2">
          {getValidationIcon()}
          {isValid && (
            <span className="text-xs text-green-500">Valid connection string</span>
          )}
          {isValid === false && value && (
            <span className="text-xs text-red-500">Invalid format</span>
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
            w-full h-32 px-4 py-3 bg-background border-2 text-foreground 
            placeholder-muted-foreground rounded-lg transition-all duration-200 resize-none
            focus:outline-none ${getBorderColor()}
          `}
        />
        
        {!value && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="flex items-center gap-2 text-muted-foreground">
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
            className="flex items-center gap-2"
          >
            <ClipboardPaste size={16} />
            Paste
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleClear}
            className="flex items-center gap-2"
            disabled={!value}
          >
            <Eraser size={16} />
            Clear
          </Button>
        </div>
        <div className="text-xs text-muted-foreground">
          {value.length > 0 && `${value.length} characters`}
        </div>
      </div>
    </div>
  );
};

export default ConnectionStringTextarea;
