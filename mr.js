// ---------- كود السويتش الليلي/النهاري ----------
let isNightMode = false;

function toggleBackground() {
  const body = document.body;
  const toggle = document.querySelector('.toggle-switch');

  if (isNightMode) {
    // الوضع العادي (نهار)
    body.style.backgroundImage = '';
    body.style.backgroundColor = 'rgba(232, 231, 231, 1)';
    toggle.classList.remove('active');
  } else {
    // الوضع الليلي
    body.style.backgroundImage = 'linear-gradient(135deg, #10746dff, #063666ff)';
    body.style.backgroundColor = '';
    toggle.classList.add('active');
  }

  isNightMode = !isNightMode;
}

// ---------- كود الشات ----------

// العناصر
const bubble = document.getElementById('chat-bubble');
const chatWin = document.getElementById('chat-window');
const chatMessages = document.getElementById('chat-messages');
const chatInput = document.getElementById('chat-input');

// رابط API (تغيره بعد رفع الباك إند)
const API_URL = '/ask'; // Vercel هيخليها على نفس الدومين

// فتح وغلق الشات عند الضغط على الفقاعة
bubble.onclick = () => {
  chatWin.style.display = chatWin.style.display === 'flex' ? 'none' : 'flex';
};

// ارسال رسالة عند الضغط على Enter
chatInput.addEventListener('keypress', async (e) => {
  if (e.key === 'Enter' && chatInput.value.trim() !== '') {
    const userMsg = chatInput.value.trim();

    // إضافة رسالة المستخدم للشات
    const userDiv = document.createElement('div');
    userDiv.textContent = 'أنت: ' + userMsg;
    userDiv.style.marginBottom = '5px';
    userDiv.style.fontWeight = 'bold';
    chatMessages.appendChild(userDiv);

    chatInput.value = '';

    try {
      // إرسال الرسالة للباك إند
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg })
      });

      const data = await res.json();

      // إضافة رد البوت للشات
      const botDiv = document.createElement('div');
      botDiv.textContent = 'بوت: ' + data.reply;
      botDiv.style.marginBottom = '5px';
      botDiv.style.color = '#10746d';
      chatMessages.appendChild(botDiv);

      // التمرير تلقائيًا لأسفل الشات
      chatMessages.scrollTop = chatMessages.scrollHeight;

    } catch {
      const errDiv = document.createElement('div');
      errDiv.textContent = 'حدث خطأ، حاول مرة أخرى';
      errDiv.style.color = 'red';
      chatMessages.appendChild(errDiv);
    }
  }
});
