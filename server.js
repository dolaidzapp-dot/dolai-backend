import 【entity-express¦canonical_name=express】 from '【entity-express¦canonical_name=express】';
import cors from 'cors';

const app = 【entity-express¦canonical_name=express】();
app.use(cors());
app.use(【entity-express¦canonical_name=express】.json());

app.get('/', (req, res) => {
  res.json({ ok: true, service: 'DOLAI Backend' });
});

app.post('/api/chat', async (req, res) => {
  const message = req.body.message || '';
  const key = process.env.GEMINI_API_KEY;

  if (!key) {
    return res.json({ reply: 'الخادم يخدم، بصح المفتاح مازال ما تحطش.' });
  }

  try {
    const r = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' + key, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: 'أنت DOLAI، مساعد ذكي جزائري، جاوب بالدارجة الجزائرية البسيطة. سؤال المستخدم: ' + message }] }]
      })
    });
    const data = await r.json();
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'ما قدرتش نجاوب درك، عاود حاول.';
    res.json({ reply });
  } catch (e) {
    res.json({ reply: 'صرات مشكلة في الخادم، عاود حاول.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('DOLAI running on ' + PORT));
