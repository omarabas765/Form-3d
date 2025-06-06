let selectedUnitType = "";

function selectUnit(el, type) {
  document.querySelectorAll('.unit-card').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
  selectedUnitType = type;
  document.getElementById('unitType').value = type;
}

function toggleStep(currentId, nextId) {
  document.querySelectorAll('.step').forEach(step => step.classList.remove('active'));
  document.getElementById(nextId).classList.add('active');
}

function goToUnitInfoStep() {
  if (!selectedUnitType) return alert("يرجى اختيار نوع الوحدة أولاً");
  toggleStep('unitSelection', 'unitInfo');
}

function saveRoomCountAndGoNext() {
  const roomCount = parseInt(document.getElementById('roomCount').value);
  const bathCount = parseInt(document.getElementById('bathroomCount').value);
  if (!roomCount || roomCount < 1) return alert("يرجى إدخال عدد الغرف");
  if (!bathCount || bathCount < 0) return alert("يرجى إدخال عدد الحمامات");
  toggleStep('unitInfo', 'roomStep');
  generateRoomCards(roomCount);
}

function generateRoomCards(count) {
  const container = document.getElementById('roomsContainer');
  container.innerHTML = '';
  for (let i = 1; i <= count; i++) {
    addRoomCard(i);
  }
  if (container.firstChild) container.firstChild.classList.add('active');
}

function addRoomCard(index) {
  const container = document.getElementById('roomsContainer');
  const card = document.createElement('div');
  card.className = 'room-card-pro';
  card.innerHTML = `
    <div class="room-card-header">
      <span>غرفة ${index}</span>
      <img src="https://cdn-icons-png.flaticon.com/512/3134/3134323.png" alt="غرفة" />
    </div>
    <div class="room-card-body">
      <label>الاسم</label><input type="text" class="room-name">
      <label>نوع الغرفة</label>
      <select class="room-type">
        <option>نوم</option><option>معيشة</option><option>مكتب</option><option>أخرى</option>
      </select>
      <label>الطول (متر)</label><input type="number" class="length" oninput="calcRoomData(this)">
      <label>العرض (متر)</label><input type="number" class="width" oninput="calcRoomData(this)">
      <p>المساحة: <span class="area">0</span> م² - المحيط: <span class="perimeter">0</span> م</p>
      <label>نوع الأرضيات</label><input type="text" class="floor-type">
      <label>حالة الجدران</label><input type="text" class="walls">
      <label>حالة السقف</label><input type="text" class="ceiling">
      <label>عدد النوافذ</label><input type="number" class="windows">
      <label>حجم النافذة (اختياري)</label><input type="text" class="window-size">
      <label>بلكونة</label><select class="balcony"><option>نعم</option><option>لا</option></select>
      <label>نوع الباب الداخلي</label><input type="text" class="door-type">
      <label>الشتر (اختياري)</label><input type="text" class="shutter">
      <div class="nav-buttons">
        <button type="button" class="prev-room-btn">⬅ السابقة</button>
        <button type="button" class="next-room-btn">➡ التالية</button>
      </div>
    </div>
  `;
  card.querySelector('.room-card-header').addEventListener('click', () => card.classList.toggle('active'));
  container.appendChild(card);

  // تفعيل/إغلاق الكارت عند الضغط على الهيدر
  card.querySelector('.room-card-header').addEventListener('click', function(e) {
    // إغلاق جميع الكروت الأخرى
    document.querySelectorAll('.room-card-pro').forEach(c => {
      if (c !== card) c.classList.remove('active');
    });
    // تبديل حالة الكارت الحالي
    card.classList.toggle('active');
  });

  // أزرار التنقل بين الغرف
  const prevBtn = card.querySelector('.prev-room-btn');
  const nextBtn = card.querySelector('.next-room-btn');
  
  prevBtn.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    const allRooms = Array.from(container.children);
    const currentIndex = allRooms.indexOf(card);
    if (currentIndex > 0) {
      allRooms.forEach(room => room.classList.remove('active'));
      allRooms[currentIndex - 1].classList.add('active');
      allRooms[currentIndex - 1].scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });
  
  nextBtn.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    const allRooms = Array.from(container.children);
    const currentIndex = allRooms.indexOf(card);
    if (currentIndex < allRooms.length - 1) {
      allRooms.forEach(room => room.classList.remove('active'));
      allRooms[currentIndex + 1].classList.add('active');
      allRooms[currentIndex + 1].scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });

  container.appendChild(card);
  return card;
}

function calcRoomData(el) {
  const card = el.closest('.room-card-pro');
  const length = parseFloat(card.querySelector('.length').value) || 0;
  const width = parseFloat(card.querySelector('.width').value) || 0;
  const area = length * width;
  const perimeter = 2 * (length + width);
  card.querySelector('.area').textContent = area.toFixed(2);
  card.querySelector('.perimeter').textContent = perimeter.toFixed(2);
}

function generateBathroomCards(count) {
  const container = document.getElementById('bathroomsContainer');
  container.innerHTML = '';
  for (let i = 1; i <= count; i++) {
    addBathroomCard(i);
  }
}

function addBathroomCard(index) {
  const container = document.getElementById('bathroomsContainer');
  const card = document.createElement('div');
  card.className = 'room-card-pro bathroom-card';
  card.innerHTML = `
    <div class="room-card-header">
      <span>حمام ${index}</span>
      <img src="https://cdn-icons-png.flaticon.com/512/168/168882.png" alt="حمام" />
    </div>
    <div class="room-card-body">
      <label>الطول (متر)</label>
      <input type="number" class="bath-length">
      <label>العرض (متر)</label>
      <input type="number" class="bath-width">
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
        <button type="button" class="prev-bath-btn">⬅ السابق</button>
        <button type="button" class="next-bath-btn">➡ التالي</button>
      </div>
    </div>
  `;

  // إضافة مستمعات الأحداث للحقول والأزرار
  const lengthInput = card.querySelector('.bath-length');
  const widthInput = card.querySelector('.bath-width');
  
  // حساب المساحة والمحيط عند تغيير الأبعاد
  [lengthInput, widthInput].forEach(input => {
    input.addEventListener('input', () => calcBathroomData(card));
  });

  // أزرار التنقل
  card.querySelector('.prev-bath-btn').addEventListener('click', (e) => {
    e.stopPropagation();
    navigateBathroom(-1, card);
  });

  card.querySelector('.next-bath-btn').addEventListener('click', (e) => {
    e.stopPropagation();
    navigateBathroom(1, card);
  });

  // تفعيل/إغلاق الكارت عند الضغط على الهيدر
  card.querySelector('.room-card-header').addEventListener('click', () => {
    card.classList.toggle('active');
  });

  container.appendChild(card);
}

function calcBathroomData(card) {
  const length = parseFloat(card.querySelector('.bath-length').value) || 0;
  const width = parseFloat(card.querySelector('.bath-width').value) || 0;
  const area = length * width;
  const perimeter = 2 * (length + width);
  card.querySelector('.bath-area').textContent = area.toFixed(2);
  card.querySelector('.bath-perimeter').textContent = perimeter.toFixed(2);
}

function navigateBathroom(direction, currentCard) {
  const allBathrooms = Array.from(document.querySelectorAll('.bathroom-card'));
  const currentIndex = allBathrooms.indexOf(currentCard);
  const nextIndex = currentIndex + direction;

  if (nextIndex >= 0 && nextIndex < allBathrooms.length) {
    allBathrooms.forEach(bath => bath.classList.remove('active'));
    allBathrooms[nextIndex].classList.add('active');
    allBathrooms[nextIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

function navigateRoom(direction, currentCard) {
  // تحديد جميع الغرف في الحاوية
  const allRooms = Array.from(document.querySelectorAll('#roomsContainer .room-card-pro:not(.bathroom-card)'));
  const currentIndex = allRooms.indexOf(currentCard);
  const nextIndex = currentIndex + direction;

  // التحقق من وجود غرفة تالية/سابقة
  if (nextIndex >= 0 && nextIndex < allRooms.length) {
    // إلغاء تنشيط جميع الغرف
    allRooms.forEach(room => room.classList.remove('active'));
    // تنشيط الغرفة الجديدة
    allRooms[nextIndex].classList.add('active');
    // التمرير إلى الغرفة الجديدة
    allRooms[nextIndex].scrollIntoView({ 
      behavior: 'smooth', 
      block: 'center' 
    });

    // تحديث حالة الأزرار
    updateNavigationButtons(allRooms[nextIndex], nextIndex, allRooms.length);
  }
}

// دالة مساعدة لتحديث حالة الأزرار
function updateNavigationButtons(card, currentIndex, totalCount) {
  const prevBtn = card.querySelector('.prev-room-btn');
  const nextBtn = card.querySelector('.next-room-btn');
  
  if (prevBtn) {
    prevBtn.disabled = currentIndex === 0;
  }
  if (nextBtn) {
    nextBtn.disabled = currentIndex === totalCount - 1;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('toUnitInfoBtn')?.addEventListener('click', goToUnitInfoStep);
  document.getElementById('saveRoomCountBtn')?.addEventListener('click', saveRoomCountAndGoNext);
  document.getElementById('addRoomBtn')?.addEventListener('click', () => addRoomCard(document.getElementById('roomsContainer').children.length + 1));
  document.getElementById('addBathroomBtn')?.addEventListener('click', () => addBathroomCard(document.getElementById('bathroomsContainer').children.length + 1));
  document.getElementById('toSummaryFromBath')?.addEventListener('click', () => toggleStep('bathroomStep', 'summaryStep'));

  document.getElementById('toBathroomStepBtn')?.addEventListener('click', () => {
    const count = parseInt(document.getElementById('bathroomCount').value);
    if (!count || count < 0) return alert("يرجى إدخال عدد الحمامات");
    toggleStep('roomStep', 'bathroomStep');
    generateBathroomCards(count);
  });

  document.querySelectorAll('.unit-card').forEach(card => {
    card.addEventListener('click', () => {
      const h4 = card.querySelector('h4');
      if (!h4) return alert("لا يمكن تحديد نوع الوحدة");
      const type = h4.textContent.trim();
      selectUnit(card, type);
    });
  });

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
