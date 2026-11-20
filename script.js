var tabs = "roi,cost,visa,tax,buy,lease,areas,checklist,fx".split(",");

function go(n) {
  for (var i = 0; i < tabs.length; i++) {
    var id = tabs.at(i);
    var s = document.getElementById('sec-' + id);
    var b = document.getElementById('n-' + id);
    if (s) s.style.display = id === n ? 'block' : 'none';
    if (b) b.className = id === n ? 'nb active' : 'nb';
  }
}

function calcRoi() {
  var city = document.getElementById('r-city').value;
  var price = parseFloat(document.getElementById('r-price').value) || 0;
  var mode = document.getElementById('r-mode').value;
  var rates = { casa: 0.068, rabat: 0.064, tanger: 0.072, kech: 0.085, agadir: 0.076 };
  var base = Reflect.get(rates, city) || 0.07;
  var mult = mode === 'short' ? 1.35 : 1.0;
  var grossYield = (base * mult * 100).toFixed(1);
  var annualUsd = Math.round(price * base * mult);
  var monthlyMad = Math.round((annualUsd / 12) * 10);
  document.getElementById('r-out').innerHTML =
    '<div class="row"><span>📈 Estimated Gross Annual Yield:</span><strong>' + grossYield + '% / year</strong></div>' +
    '<div class="row"><span>💰 Estimated Gross Annual Income:</span><strong>$' + annualUsd.toLocaleString() + ' USD</strong></div>' +
    '<div class="row" style="border:none"><span>🇲🇦 Monthly Equivalent (MAD):</span><strong>~' + monthlyMad.toLocaleString() + ' MAD / month</strong></div>' +
    '<div class="tip">💡 <strong>2030 Appreciation Bonus:</strong> Properties near Al Boraq TGV stations & host stadiums project +15% to +25% capital growth by 2030.</div>';
}

function calcCost() {
  var tier = document.getElementById('c-tier').value;
  var data = {
    solo: { rent: "$650 (6,500 MAD)", food: "$350 (3,500 MAD)", util: "$120 (Fiber + Elec + SIM)", tot: "$1,120 / month" },
    couple: { rent: "$1,100 (11,000 MAD)", food: "$600 (6,000 MAD)", util: "$250 (Utilities + Transport)", tot: "$1,950 / month" },
    family: { rent: "$1,800 (18,000 MAD)", food: "$900 (9,000 MAD)", util: "$750 (Intl School + Car)", tot: "$3,450 / month" }
  };
  var d = Reflect.get(data, tier);
  document.getElementById('c-out').innerHTML =
    '<div class="row"><span>🏠 Modern Furnished Rent:</span><strong>' + d.rent + '</strong></div>' +
    '<div class="row"><span>🥘 Groceries & Dining Out:</span><strong>' + d.food + '</strong></div>' +
    '<div class="row"><span>⚡ Fiber, Utilities & Extras:</span><strong>' + d.util + '</strong></div>' +
    '<div class="row" style="border:none"><span>💳 Total Comfortable Budget:</span><strong>' + d.tot + '</strong></div>';
}

function genLease() {
  var name = document.getElementById('l-name').value || "Tenant Name";
  var rent = document.getElementById('l-rent').value || "8500";
  document.getElementById('l-out').innerHTML =
    '<strong>CONTRAT DE BAIL RÉSIDENTIEL (EXTRAIT LÉGALISÉ):</strong><br>' +
    'Le Bailleur loue à <strong>' + name + '</strong> le bien meublé pour un loyer mensuel de <strong>' + rent + ' MAD</strong>. Ce contrat légalisé à la Moqataa vaut justificatif de domicile officiel pour la demande de Carte de Séjour.<br><br>' +
    '<strong>عقد كراء سكني (مقتطف مصادق عليه):</strong><br>' +
    'يكري المالك للسيد(ة) <strong>' + name + '</strong> الشقة المفروشة بسومة كرائية شهرية قدرها <strong>' + rent + ' درهم</strong>، ويعتمد هذا العقد المصادق عليه كإثبات للسكن لدى مصالح الأمن الوطني.';
}

function calcFx() {
  var u = parseFloat(document.getElementById('fx-usd').value) || 0;
  document.getElementById('fx-mad').innerText = Math.round(u * 10).toLocaleString() + ' MAD';
  document.getElementById('fx-eur').innerText = '€' + Math.round(u * 0.92).toLocaleString();
  document.getElementById('fx-gbp').innerText = '£' + Math.round(u * 0.78).toLocaleString();
}

calcRoi(); calcCost(); genLease(); calcFx();
