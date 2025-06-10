
/**
 * Validates if a string appears to be a connection string
 * Checks for common connection string patterns and formats
 */
export const validateConnectionString = (connectionString: string): boolean => {
  if (!connectionString || connectionString.trim().length === 0) {
    return false;
  }

  const trimmed = connectionString.trim();

  // Common connection string patterns
  const patterns = [
    // SQL Server patterns
    /^(Server|Data Source|DataSource)\s*=.+/i,
    /^.*Initial Catalog\s*=.+/i,
    /^.*Database\s*=.+/i,
    
    // PostgreSQL patterns
    /^postgresql:\/\/.+/i,
    /^postgres:\/\/.+/i,
    /^Host\s*=.+/i,
    
    // MySQL patterns
    /^mysql:\/\/.+/i,
    /^.*server\s*=.+/i,
    
    // MongoDB patterns
    /^mongodb(\+srv)?:\/\/.+/i,
    
    // Oracle patterns
    /^.*TNS_ADMIN\s*=.+/i,
    /^.*SERVICE_NAME\s*=.+/i,
    
    // Generic JDBC patterns
    /^jdbc:.+/i,
    
    // SQLite patterns
    /^.*\.db$/i,
    /^.*\.sqlite$/i,
    /^.*Data Source\s*=.*\.db/i,
    
    // Redis patterns
    /^redis:\/\/.+/i,
    
    // Generic key-value patterns (like ODBC)
    /^.*=.*;.*=.*/
  ];

  // Check if it matches any known pattern
  const matchesPattern = patterns.some(pattern => pattern.test(trimmed));
  
  // Additional checks for minimum requirements
  const hasKeyValuePairs = trimmed.includes('=') || trimmed.includes('://');
  const hasMinimumLength = trimmed.length >= 10; // Reasonable minimum
  
  return matchesPattern && hasKeyValuePairs && hasMinimumLength;
};

/**
 * Compares two connection strings for exact equality
 */
export const compareConnectionStrings = (str1: string, str2: string): boolean => {
  if (!str1 || !str2) return false;
  return str1.trim() === str2.trim();
};

/**
 * Sanitizes a connection string for display (hides sensitive information)
 */
export const sanitizeConnectionString = (connectionString: string): string => {
  return connectionString.replace(/(password|pwd|token|secret|key)\s*=\s*[^;]+/gi, '$1=***');
};
