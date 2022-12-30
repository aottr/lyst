const useDarkMode = () => {
  const isDarkMode = useState('DarkMode', () => true);
  return {
    isDarkMode,
  };
};

export default useDarkMode;
