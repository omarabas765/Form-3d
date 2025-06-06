// 🟦 متغير لحفظ نوع الوحدة المختارة
let selectedUnitType = "";

// ✅ تحديد نوع الوحدة عند الضغط على كرت
function selectUnit(el, type) {
  document.querySelectorAll('.unit-card').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
  selectedUnitType = type;
  document.getElementById('unitType').value = type;
}

// ✅ التبديل بين المراحل (خطوة حالية -> خطوة تالية)
function toggleStep(currentId, nextId) {
  document.querySelectorAll('.step').forEach(step => step.classList.remove('active'));
  document.getElementById(nextId).classList.add('active');
}

// ✅ عند الضغط على زر "التالي" في خطوة نوع الوحدة
function goToUnitInfoStep() {
  if (!selectedUnitType) return alert("يرجى اختيار نوع الوحدة أولاً");
  toggleStep('unitSelection', 'unitInfo');
}

// ✅ حفظ عدد الغرف والحمامات ثم الانتقال لمرحلة الغرف
function saveRoomCountAndGoNext() {
  const roomCount = parseInt(document.getElementById('roomCount').value);
  const bathCount = parseInt(document.getElementById('bathroomCount').value);

  if (!roomCount || roomCount < 1) return alert("يرجى إدخال عدد الغرف");
  if (bathCount < 0 || isNaN(bathCount)) return alert("يرجى إدخال عدد الحمامات");

  toggleStep('unitInfo', 'roomStep');
  generateRoomCards(roomCount);
}

// ✅ توليد كروت الغرف
function generateRoomCards(count) {
  const container = document.getElementById('roomsContainer');
  container.innerHTML = '';

  for (let i = 1; i <= count; i++) {
    const card = createRoomCard(i);
    container.appendChild(card);
  }

  activateCard(container.firstChild);
}

// ✅ توليد كروت الحمامات
function generateBathroomCards(count) {
  const container = document.getElementById('bathroomsContainer');
  container.innerHTML = '';

  for (let i = 1; i <= count; i++) {
    const card = createBathroomCard(i);
    container.appendChild(card);
  }

  activateCard(container.firstChild);
}

// ✅ دالة لتفعيل كارت وتوسيع محتواه
function activateCard(card) {
  // ✅ إذا الكرت مفتوح: نغلقه فقط
  if (card.classList.contains('active')) {
    card.classList.remove('active');
    return;
  }

  // ✅ إذا الكرت مغلق: نغلق كل الكروت ونفتح هذا الكرت
  document.querySelectorAll('.room-card-pro').forEach(c => c.classList.remove('active'));
  card.classList.add('active');
}


// ✅ إنشاء كارت غرفة
// ✅ تعديل دالة إنشاء كارت الغرفة createRoomCard(index)
function createRoomCard(index) {
  const div = document.createElement('div');
  div.className = 'room-card-pro';

  // 🏗️ إنشاء محتوى الكارت يدويًا
  const body = document.createElement('div');
  body.className = 'room-card-body';
  body.innerHTML = `
    <label>الاسم</label><input type="text" class="room-name">
    <label>نوع الغرفة</label>
    <select class="room-type">
      <option>نوم</option><option>معيشة</option><option>مكتب</option><option>أخرى</option>
    </select>
    <label>الطول (متر)</label><input type="number" class="length" oninput="calcRoomData(this)">
    <label>العرض (متر)</label><input type="number" class="width" oninput="calcRoomData(this)">
    <p>المساحة: <span class="area">0</span> م² - المحيط: <span class="perimeter">0</span> م</p>

    <label>نوع الأرضيات</label>
    <div class="options" id="floorTypeOptions">
      <div class="choice-card" data-value="Wood"><img src="images/wood.png" /><span>خشب</span></div>
      <div class="choice-card" data-value="Marble"><img src="images/marble.jpg" /><span>رخام</span></div>
      <div class="choice-card" data-value="Ceramic"><img src="images/ceramic.jpg" /><span>سيراميك</span></div>
    </div>
    <input type="hidden" class="floor-type">

    <label>حالة الجدران</label>
    <div class="options" id="wallConditionOptions">
      <div class="choice-card" data-value="Painted"><img src="images/painted.png" /><span>دهان</span></div>
      <div class="choice-card" data-value="Wallpaper"><img src="images/wallpaper.png" /><span>ورق حائط</span></div>
    </div>
    <input type="hidden" class="walls">

    <label>حالة السقف</label>
    <div class="options" id="ceilingTypeOptions">
      <div class="choice-card" data-value="Gypsum"><img src="images/gypsum.png" /><span>جبس</span></div>
      <div class="choice-card" data-value="Flat"><img src="images/flat.png" /><span>سقف مسطح</span></div>
    </div>
    <input type="hidden" class="ceiling">

    <label>بلكونة</label>
    <div class="options" id="balconyOptions">
      <div class="choice-card" data-value="Yes"><img src="images/yes.png" /><span>نعم</span></div>
      <div class="choice-card" data-value="No"><img src="images/no.png" /><span>لا</span></div>
    </div>
    <input type="hidden" class="balcony">

    <label>نوع الباب الداخلي</label>
    <div class="options" id="doorTypeOptions">
      <div class="choice-card" data-value="Wood"><img src="images/door-wood.png" /><span>خشب</span></div>
      <div class="choice-card" data-value="PVC"><img src="images/door-pvc.png" /><span>PVC</span></div>
    </div>
    <input type="hidden" class="door-type">

    <label>الشتر (اختياري)</label>
    <div class="options" id="shutterOptions">
      <div class="choice-card" data-value="Manual"><img src="images/shutter-manual.png" /><span>يدوي</span></div>
      <div class="choice-card" data-value="Electric"><img src="images/shutter-electric.png" /><span>كهرباء</span></div>
    </div>
    <input type="hidden" class="shutter">

    <label>عدد النوافذ</label><input type="number" class="windows">
    <label>حجم النافذة (اختياري)</label><input type="text" class="window-size">

    <div class="nav-buttons">
      <button type="button" onclick="navigateRoom(-1, this)">⬅ السابقة</button>
      <button type="button" onclick="navigateRoom(1, this)">➡ التالية</button>
    </div>
  `;

  // رأس الكرت
  const header = document.createElement('div');
  header.className = 'room-card-header';
  header.innerHTML = `<span>غرفة ${index}</span><img src="https://cdn-icons-png.flaticon.com/512/3134/3134323.png" />`;
  header.onclick = () => activateCard(div);

  // تركيب الكرت النهائي
  div.appendChild(header);
  div.appendChild(body);

  // تفعيل الاختيار البصري لجميع مجموعات الخيارات داخل هذا الكرت
  div.querySelectorAll('.options').forEach(group => {
    group.querySelectorAll('.choice-card').forEach(opt => {
      opt.addEventListener('click', () => {
        group.querySelectorAll('.choice-card').forEach(o => o.classList.remove('selected'));
        opt.classList.add('selected');
        const hidden = group.nextElementSibling;
        if (hidden && hidden.type === 'hidden') {
          hidden.value = opt.dataset.value;
        }
      });
    });
  });

  return div;
}

function generateReceptionCards() {
  const count = parseInt(document.getElementById('receptionCount').value);
  if (!count || count < 1) return alert("يرجى إدخال عدد الأجزاء أولاً");
  const container = document.getElementById('receptionContainer');
  container.innerHTML = '';
  for (let i = 1; i <= count; i++) {
    const card = createReceptionCard(i);
    container.appendChild(card);
  }
  activateCard(container.firstChild);
}

// ✅ إنشاء كارت حمام
function createBathroomCard(index) {
  const div = document.createElement('div');
  div.className = 'room-card-pro bathroom-card';
  div.innerHTML = `
    <div class="room-card-header"><span>حمام ${index}</span><img src="https://cdn-icons-png.flaticon.com/512/168/168882.png" /></div>
    <div class="room-card-body">
      <label>الطول (متر)</label><input type="number" class="bath-length">
      <label>العرض (متر)</label><input type="number" class="bath-width">
      <p>المساحة: <span class="bath-area">0</span> م² - المحيط: <span class="bath-perimeter">0</span> م</p>
      <label>نوع الأرضيات</label><input type="text" class="bath-floor">
      <label>حالة الجدران</label><input type="text" class="bath-wall">
      <label>حالة السقف</label><input type="text" class="bath-ceiling">
      <label>نوع الحوض</label><input type="text" class="bath-sink">
      <label>نوع المرحاض</label><input type="text" class="bath-toilet">
      <label>نوع الدش</label><input type="text" class="bath-shower">
      <label>نوع خلاط الدش</label><input type="text" class="mixer-shower">
      <label>نوع خلاط الحوض</label><input type="text" class="mixer-sink">
      <label>نوع خلاط المرحاض</label><input type="text" class="mixer-toilet">
      <label>نوع الباب الداخلي</label><input type="text" class="bath-door">
      <div class="nav-buttons">
        <button type="button" onclick="navigateBathroom(-1, this)">⬅ السابق</button>
        <button type="button" onclick="navigateBathroom(1, this)">➡ التالي</button>
      </div>
    </div>
  `;
  div.querySelector('.room-card-header').onclick = () => activateCard(div);
  div.querySelectorAll('.bath-length, .bath-width').forEach(input =>
    input.addEventListener('input', () => calcBathroomData(div))
  );
  return div;
}
function toReceptionStep() {
  toggleStep('bathroomStep', 'receptionStep');
}

document.getElementById('toReceptionStepBtn')?.addEventListener('click', toReceptionStep);

// ✅ تعديل دالة إنشاء كارت الريسيبشن createReceptionCard(index)
function createReceptionCard(index) {
  const div = document.createElement('div');
  div.className = 'room-card-pro reception-card';

  const body = document.createElement('div');
  body.className = 'room-card-body';
  body.innerHTML = `
    <label>الطول (متر)</label><input type="number" class="length" oninput="calcReceptionData(this)">
    <label>العرض (متر)</label><input type="number" class="width" oninput="calcReceptionData(this)">
    <p>المساحة: <span class="area">0</span> م² - المحيط: <span class="perimeter">0</span> م</p>

    <label>نوع الأرضيات</label>
    <div class="options">
      <div class="choice-card" data-value="Marble"><img src="images/marble.png"><span>رخام</span></div>
      <div class="choice-card" data-value="Ceramic"><img src="images/ceramic.png"><span>سيراميك</span></div>
    </div>
    <input type="hidden" class="floor-type">

    <label>حالة الجدران</label>
    <div class="options">
      <div class="choice-card" data-value="Painted"><img src="images/painted.png"><span>دهان</span></div>
      <div class="choice-card" data-value="Wallpaper"><img src="images/wallpaper.png"><span>ورق حائط</span></div>
    </div>
    <input type="hidden" class="walls">

    <label>حالة السقف</label>
    <div class="options">
      <div class="choice-card" data-value="Gypsum"><img src="images/gypsum.png"><span>جبس</span></div>
      <div class="choice-card" data-value="Flat"><img src="images/flat.png"><span>مسطح</span></div>
    </div>
    <input type="hidden" class="ceiling">

    <label>هل يوجد نوافذ؟</label>
    <div class="options">
      <div class="choice-card" data-value="Yes"><img src="images/yes.png"><span>نعم</span></div>
      <div class="choice-card" data-value="No"><img src="images/no.png"><span>لا</span></div>
    </div>
    <input type="hidden" class="windows">

    <label>هل يوجد بلكونة؟</label>
    <div class="options">
      <div class="choice-card" data-value="Yes"><img src="images/yes.png"><span>نعم</span></div>
      <div class="choice-card" data-value="No"><img src="images/no.png"><span>لا</span></div>
    </div>
    <input type="hidden" class="balcony">

    <label>باب المدخل الرئيسي</label>
    <div class="options">
      <div class="choice-card" data-value="Wood"><img src="images/door-wood.png"><span>خشب</span></div>
      <div class="choice-card" data-value="PVC"><img src="images/door-pvc.png"><span>PVC</span></div>
    </div>
    <input type="hidden" class="door-type">

    <label>هل يحتوي على شتر؟</label>
    <div class="options">
      <div class="choice-card" data-value="Yes"><img src="images/shutter-electric.png"><span>نعم</span></div>
      <div class="choice-card" data-value="No"><img src="images/shutter-manual.png"><span>لا</span></div>
    </div>
    <input type="hidden" class="shutter">

    <div class="nav-buttons">
      <button type="button" onclick="navigateReception(-1, this)">⬅ السابق</button>
      <button type="button" onclick="navigateReception(1, this)">➡ التالي</button>
    </div>
  `;

  const header = document.createElement('div');
  header.className = 'room-card-header';
  header.innerHTML = `<span>جزء ${index}</span><img src="images/hall.png">`;
  header.onclick = () => activateCard(div);

  div.appendChild(header);
  div.appendChild(body);

  div.querySelectorAll('.options').forEach(group => {
    group.querySelectorAll('.choice-card').forEach(opt => {
      opt.addEventListener('click', () => {
        group.querySelectorAll('.choice-card').forEach(o => o.classList.remove('selected'));
        opt.classList.add('selected');
        const hidden = group.nextElementSibling;
        if (hidden && hidden.type === 'hidden') {
          hidden.value = opt.dataset.value;
        }
      });
    });
  });

  return div;
}
function createKitchenCard() {
  const div = document.createElement('div');
  div.className = 'room-card-pro kitchen-card';

  const body = document.createElement('div');
  body.className = 'room-card-body';
  body.innerHTML = `
    <label>الطول (متر)</label><input type="number" class="length" oninput="calcKitchenData(this)">
    <label>العرض (متر)</label><input type="number" class="width" oninput="calcKitchenData(this)">
    <p>المساحة: <span class="area">0</span> م² - المحيط: <span class="perimeter">0</span> م</p>

    <label>نوع الأرضيات</label>
    <div class="options">
      <div class="choice-card" data-value="رخام"><img src="images/marble.png"><span>رخام</span></div>
      <div class="choice-card" data-value="سيراميك"><img src="images/ceramic.png"><span>سيراميك</span></div>
    </div>
    <input type="hidden" class="floor-type">

    <label>حالة الجدران</label>
    <div class="options">
      <div class="choice-card" data-value="دهان"><img src="images/painted.png"><span>دهان</span></div>
      <div class="choice-card" data-value="سيراميك"><img src="images/ceramic-wall.png"><span>سيراميك</span></div>
    </div>
    <input type="hidden" class="walls">

    <label>حالة السقف</label>
    <div class="options">
      <div class="choice-card" data-value="جبس"><img src="images/gypsum.png"><span>جبس</span></div>
      <div class="choice-card" data-value="مسطح"><img src="images/flat.png"><span>مسطح</span></div>
    </div>
    <input type="hidden" class="ceiling">

    <label>تهوية</label>
    <div class="options">
      <div class="choice-card" data-value="شفاط"><img src="images/exhaust.png"><span>شفاط</span></div>
      <div class="choice-card" data-value="نافذة"><img src="images/window.png"><span>نافذة</span></div>
    </div>
    <input type="hidden" class="ventilation">

    <label>باب داخلي</label>
    <div class="options">
      <div class="choice-card" data-value="خشب"><img src="images/door-wood.png"><span>خشب</span></div>
      <div class="choice-card" data-value="PVC"><img src="images/door-pvc.png"><span>PVC</span></div>
    </div>
    <input type="hidden" class="door-type">
  `;

  const header = document.createElement('div');
  header.className = 'room-card-header';
  header.innerHTML = `<span>المطبخ</span><img src="images/kitchen.png">`;
  header.onclick = () => activateCard(div);

  div.appendChild(header);
  div.appendChild(body);

  // تفعيل الاختيارات
  div.querySelectorAll('.options').forEach(group => {
    group.querySelectorAll('.choice-card').forEach(opt => {
      opt.addEventListener('click', () => {
        group.querySelectorAll('.choice-card').forEach(o => o.classList.remove('selected'));
        opt.classList.add('selected');
        const hidden = group.nextElementSibling;
        if (hidden && hidden.type === 'hidden') {
          hidden.value = opt.dataset.value;
        }
      });
    });
  });

  return div;
}
document.getElementById('toKitchenStepBtn')?.addEventListener('click', () => {
  toggleStep('receptionStep', 'kitchenStep');
  const container = document.getElementById('kitchenContainer');
  container.innerHTML = '';
  container.appendChild(createKitchenCard());
  activateCard(container.firstChild);
});
document.getElementById('toSummaryFromKitchen')?.addEventListener('click', () => {
  toggleStep('kitchenStep', 'summaryStep');
});


// ✅ دالة لحساب المساحة والمحيط في الريسيبشن
function calcReceptionData(el) {
  const card = el.closest('.reception-card');
  const length = parseFloat(card.querySelector('.length').value) || 0;
  const width = parseFloat(card.querySelector('.width').value) || 0;
  card.querySelector('.area').textContent = (length * width).toFixed(2);
  card.querySelector('.perimeter').textContent = (2 * (length + width)).toFixed(2);
}

// ✅ دالة للتنقل بين كروت الريسيبشن
function navigateReception(direction, btn) {
  const currentCard = btn.closest('.reception-card');
  const allCards = Array.from(document.querySelectorAll('.reception-card'));
  const index = allCards.indexOf(currentCard);
  const next = index + direction;
  if (next >= 0 && next < allCards.length) {
    activateCard(allCards[next]);
    allCards[next].scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}


// ✅ حساب المساحة والمحيط للغرف
function calcRoomData(el) {
  const card = el.closest('.room-card-pro');
  const length = parseFloat(card.querySelector('.length').value) || 0;
  const width = parseFloat(card.querySelector('.width').value) || 0;
  card.querySelector('.area').textContent = (length * width).toFixed(2);
  card.querySelector('.perimeter').textContent = (2 * (length + width)).toFixed(2);
}

// ✅ حساب المساحة والمحيط للحمامات
function calcBathroomData(card) {
  const length = parseFloat(card.querySelector('.bath-length').value) || 0;
  const width = parseFloat(card.querySelector('.bath-width').value) || 0;
  card.querySelector('.bath-area').textContent = (length * width).toFixed(2);
  card.querySelector('.bath-perimeter').textContent = (2 * (length + width)).toFixed(2);
}

// ✅ التنقل بين الغرف
function navigateRoom(direction, btn) {
  const currentCard = btn.closest('.room-card-pro');
  const allRooms = Array.from(document.querySelectorAll('#roomsContainer .room-card-pro'));
  const currentIndex = allRooms.indexOf(currentCard);
  const newIndex = currentIndex + direction;

  if (newIndex >= 0 && newIndex < allRooms.length) {
    activateCard(allRooms[newIndex]);
    allRooms[newIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

// ✅ التنقل بين الحمامات
function navigateBathroom(direction, btn) {
  const currentCard = btn.closest('.bathroom-card');
  const allBaths = Array.from(document.querySelectorAll('#bathroomsContainer .bathroom-card'));
  const currentIndex = allBaths.indexOf(currentCard);
  const newIndex = currentIndex + direction;

  if (newIndex >= 0 && newIndex < allBaths.length) {
    activateCard(allBaths[newIndex]);
    allBaths[newIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

// ✅ تجهيز كل الأحداث عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('toUnitInfoBtn')?.addEventListener('click', goToUnitInfoStep);
  document.getElementById('saveRoomCountBtn')?.addEventListener('click', saveRoomCountAndGoNext);
  document.getElementById('addRoomBtn')?.addEventListener('click', () => {
    const index = document.getElementById('roomsContainer').children.length + 1;
    document.getElementById('roomsContainer').appendChild(createRoomCard(index));
  });
  document.getElementById('addBathroomBtn')?.addEventListener('click', () => {
    const index = document.getElementById('bathroomsContainer').children.length + 1;
    document.getElementById('bathroomsContainer').appendChild(createBathroomCard(index));
  });

  document.getElementById('toBathroomStepBtn')?.addEventListener('click', () => {
    const count = parseInt(document.getElementById('bathroomCount').value);
    if (!count || count < 0) return alert("يرجى إدخال عدد الحمامات");
    toggleStep('roomStep', 'bathroomStep');
    generateBathroomCards(count);
  });

  document.getElementById('toSummaryFromBath')?.addEventListener('click', () => {
    toggleStep('bathroomStep', 'summaryStep');
  });

  // خيارات اختيار نوع الوحدة
  document.querySelectorAll('.unit-card').forEach(card => {
    card.addEventListener('click', () => {
      const title = card.querySelector('h4')?.textContent?.trim();
      if (title) selectUnit(card, title);
    });
  });

  // خيارات الحالة: (التشطيب، النوافذ، الخ...)
  ['unitStatusOptions', 'windowStatusOptions', 'finishStatusOptions'].forEach(id => {
    document.querySelectorAll(`#${id} .unit-option`).forEach(opt => {
      opt.addEventListener('click', function () {
        document.querySelectorAll(`#${id} .unit-option`).forEach(o => o.classList.remove('selected'));
        this.classList.add('selected');
        document.getElementById(id.replace('Options', '')).value = this.dataset.value;
      });
    });
  });
});

