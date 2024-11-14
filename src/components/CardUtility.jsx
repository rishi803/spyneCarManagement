// components/Button.jsx
export const Button = ({ children, className = '', ...props }) => {
    return (
      <button
        className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 
        transition-colors duration-200 font-medium ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  };
  
  // components/Input.jsx
  export const Input = ({ className = '', ...props }) => {
    return (
      <input
        className={`w-full px-4 py-2 border border-gray-300 rounded-md 
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
        transition-all duration-200 ${className}`}
        {...props}
      />
    );
  };
  
  // components/Card.jsx
  export const Card = ({ children, className = '', ...props }) => {
    return (
      <div
        className={`bg-white rounded-lg border border-gray-200 overflow-hidden ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  };
  
  export const CardHeader = ({ children, className = '', ...props }) => {
    return (
      <div
        className={`px-6 py-4 border-b border-gray-200 ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  };
  
  export const CardTitle = ({ children, className = '', ...props }) => {
    return (
      <h3
        className={`text-xl font-semibold text-gray-900 ${className}`}
        {...props}
      >
        {children}
      </h3>
    );
  };
  
  export const CardContent = ({ children, className = '', ...props }) => {
    return (
      <div
        className={`px-6 py-4 ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  };

  export const Textarea = ({ className = '', ...props }) => {
    return (
      <textarea
        className={`w-full px-4 py-3 border border-gray-200 rounded-md 
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
        resize-vertical min-h-[100px]
        placeholder:text-gray-400
        text-gray-900
        transition-all duration-200
        ${className}`}
        {...props}
      />
    );
  };