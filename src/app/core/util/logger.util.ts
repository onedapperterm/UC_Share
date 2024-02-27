const LogType = {
  base: [
    'color: black',
    'background-color: #08b0b3',
    'padding: 2px 4px',
    'border-radius: 2px',
  ],
  success: ['color: white', 'background-color: green'],
  warning: [ 'background-color: orange'],
  error: ['color: white', 'background-color: red'],
};

export const logger = (text: string, type?: 'warn' | 'success' | 'error') => {
  let style = LogType.base.join(';') + ';';
  switch(type) {
    case 'success': style += LogType.success.join(';'); break;
    case 'warn': style += LogType.warning.join(';'); break;
    case 'error': style += LogType.error.join(';'); break;
  }
  console.log(`%c${text}`, style);
};

