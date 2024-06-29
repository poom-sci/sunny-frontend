import { useSpring, animated } from "@react-spring/web";

const AnimatedProgress: React.FC<{ progress: number }> = ({ progress }) => {
  const props = useSpring({
    width: `${progress}%`,
    from: { width: "0%" },
    config: { duration: 500 }
  });

  return <animated.div className="h-full bg-gray-500/60" style={props} />;
};

export default AnimatedProgress;
