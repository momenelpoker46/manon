import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Gift } from 'lucide-react';

const StoryPage: React.FC = () => {
  const storyText = `يمكن دة مش احسن عيد ميلاد ليكي يعدي علينا سوا بس حاولت احط بصمة في يوم بالنسبالي من اهم ايام السنة اذ مكنش هو الاهم انهاردة انا حابب اقولك انك احلي حاجة دخلت حياتي وهتفضلي بنتي قبل صحبتي وحبيبتي وهفضل طول عمري مش ناسي ولا لحظة بينا ولا عمري هندم علي اي حاجة عشناها سوا يمكن بنزعل كتير وبندب فبعض يمكن فراقنا طول بس لسة زي منتي في قلبي مكانك متحركش حياتي كنت مبسوط بيها بس عشان قربت احقق حلمي وافتح الستوديو واكون حياتي وبعدها اوصل للحلم الاكبر اني اتقدملك والمراضي اكون جاهز اجر شقة لحد مستلم شقتنا لاكن مرة واحدة كل حاجة اتهدت الفلوس راحت في لحظة ولا كاني تعبت كذا شهر فيها كل اللي كنت ببنية اتهد اه نا حرفيا دي من اكتر فترات زعلي في حياتي بس لاني بسبب الدنيا وبسبب مصر معرفتش احقق حلمي بس هحاول تاني وهعافر تاني عشان نتي تستاهلي وحياتي معاكي تستاهل اتمني السنة اللي جايه نكون بنعمل فرحنا اتمنا السنة الجاية نكون اققرب اتنين لبعض اتمني تفضلي حبيبتي وبنتي لحد اخر يوم في عمري اتمني نفضل سوا ❤️
كل سنه ونتي طيبة يحبيبة قلبي وربنا يارب يخليكي ليا ويديمك فيحاتي نعمة طول العمر 😍`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-600 via-red-500 to-orange-500 p-4">
      <div className="max-w-4xl mx-auto pt-8">
        <motion.div 
          className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.div 
            className="text-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <Gift className="w-16 h-16 text-pink-500 mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              القصة
            </h1>
            <div className="flex items-center justify-center space-x-2 space-x-reverse">
              <Heart className="w-6 h-6 text-red-500" />
              <Heart className="w-8 h-8 text-red-500" />
              <Heart className="w-6 h-6 text-red-500" />
            </div>
          </motion.div>

          <motion.div 
            className="prose prose-lg max-w-none text-right leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1.2 }}
          >
            <p className="text-gray-800 text-lg md:text-xl leading-loose whitespace-pre-line">
              {storyText}
            </p>
          </motion.div>

          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            <div className="inline-flex items-center space-x-4 space-x-reverse bg-gradient-to-r from-pink-500 to-red-500 text-white px-8 py-4 rounded-full text-xl font-semibold">
              <Heart className="w-8 h-8" />
              <span>مع كل حبي</span>
              <Heart className="w-8 h-8" />
            </div>
          </motion.div>

          <motion.div 
            className="flex justify-center mt-8 space-x-4 space-x-reverse"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
          >
            {[...Array(7)].map((_, i) => (
              <motion.div
                key={i}
                className="w-4 h-4 bg-red-400 rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default StoryPage;
