// components/ViralStats.tsx
import { motion } from 'framer-motion';
import { TrendingUp, Users, Zap } from 'lucide-react';

interface ViralStatsProps {
  memesCreated: number;
  viralScore: number;
}

export default function ViralStats({ memesCreated, viralScore }: ViralStatsProps) {
  const stats = [
    {
      icon: <Zap className="text-yellow-500" />,
      label: "Memes Created",
      value: memesCreated.toLocaleString(),
      color: "from-yellow-400 to-orange-500"
    },
    {
      icon: <TrendingUp className="text-green-500" />,
      label: "Avg Viral Score",
      value: `${viralScore}%`,
      color: "from-green-400 to-blue-500"
    },
    {
      icon: <Users className="text-purple-500" />,
      label: "Active Creators",
      value: "2.4K",
      color: "from-purple-400 to-pink-500"
    }
  ];

  return (
    <motion.div 
      className="flex justify-center gap-6 mb-8 flex-wrap"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          whileHover={{ scale: 1.05, y: -2 }}
          className={`bg-white/20 backdrop-blur-sm rounded-2xl p-4 border-2 border-white/30`}
        >
          <div className="flex items-center gap-3">
            {stat.icon}
            <div>
              <div className="text-white text-sm font-semibold">{stat.label}</div>
              <div className={`text-2xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                {stat.value}
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
