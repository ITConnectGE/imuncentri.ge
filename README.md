# imuncentri.ge

იმუნიზაციის ცენტრის ვებგვერდი — სტატიკური საიტი (HTML / CSS / JS, build-ის გარეშე).

## სტრუქტურა

```
index.html            მთავარი გვერდი
about.html            ჩვენ შესახებ
services.html         სერვისები
blog.html             ბლოგი
blog/                 ბლოგის სტატიები
contact.html          დაგვიკავშირდით
privacy-policy.html   კონფიდენციალურობის პოლიტიკა
quality-policy.html   ხარისხის პოლიტიკა
css/style.css         სტილები
js/main.js            სკრიპტები
images/               სურათები
```

## ლოკალურად გაშვება

```bash
python -m http.server 8765 --bind 127.0.0.1
```

შემდეგ გახსენით http://127.0.0.1:8765/

## პუბლიკაცია

საიტი ავტომატურად ქვეყნდება GitHub Pages-ზე `main` ბრენჩის root-იდან.
