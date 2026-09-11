/* ==================================================
   THE RESIDENCE 南風原
   Main JavaScript
================================================== */


/* ==================================================
   ELEMENTS
================================================== */

const header = document.querySelector(".header");

const menuButton = document.querySelector(".menu-button");
const nav = document.querySelector(".nav");
const navLinks = document.querySelectorAll(".nav a");

const planCards = document.querySelectorAll(".plan-card");

const modal = document.querySelector(".modal");
const modalBox = document.querySelector(".modal-box");
const modalClose = document.querySelector(".modal-close");

const modalTitle = document.querySelector("#modalTitle");
const modalPlan = document.querySelector("#modalPlan");
const modalText = document.querySelector("#modalText");

const contactForm = document.querySelector("#contactForm");
const toast = document.querySelector(".toast");


/* ==================================================
   HEADER SCROLL
================================================== */

/*
   ページを少しスクロールすると
   ヘッダーを明るい背景に変更
*/

function updateHeader() {

  if (window.scrollY > 80) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }

}

window.addEventListener("scroll", updateHeader);

updateHeader();


/* ==================================================
   MOBILE MENU
================================================== */

/*
   ハンバーガーボタンを押した時に
   メニューを開閉
*/

menuButton.addEventListener("click", () => {

  const isOpen = nav.classList.toggle("open");

  menuButton.setAttribute(
    "aria-expanded",
    isOpen
  );

});


/*
   ナビゲーション内のリンクを押したら
   スマホメニューを閉じる
*/

navLinks.forEach((link) => {

  link.addEventListener("click", () => {

    nav.classList.remove("open");

    menuButton.setAttribute(
      "aria-expanded",
      "false"
    );

  });

});


/* ==================================================
   PLAN DATA
================================================== */

/*
   A・B・Cそれぞれの情報をここで管理
*/

const planData = {

  A: {
    title: "A TYPE",
    type: "3LDK",
    area: "72.48㎡",
    image: "plan-a.png",
    description:
      "南向きの明るいリビングを中心に、家族が自然と集まる3LDKプラン。収納スペースにも配慮した、子育て世帯に使いやすい住空間です。"
  },

  B: {
    title: "B TYPE",
    type: "4LDK",
    area: "81.32㎡",
    image: "plan-b.png",
    description:
      "4つの居室を確保したゆとりある4LDKプラン。子ども部屋やワークスペースなど、家族の成長に合わせて柔軟に使えます。"
  },

  C: {
    title: "C TYPE",
    type: "3LDK",
    area: "75.10㎡",
    image: "plan-c.png",
    description:
      "開放感を感じられる角住戸をイメージした3LDKプラン。家族の時間と、それぞれのプライベート空間を両立しています。"
  }

};


/* ==================================================
   PLAN MODAL
================================================== */

/*
   間取りカードをクリックした時に
   そのタイプの画像をモーダル表示
*/

planCards.forEach((card) => {

  card.addEventListener("click", () => {

    const planType = card.dataset.plan;

    const data = planData[planType];

    if (!data) {
      return;
    }


    /* タイトル */

    modalTitle.textContent =
      `${data.title} / ${data.type} / ${data.area}`;


    /* 間取り画像 */

    modalPlan.innerHTML = `
      <img
        src="${data.image}"
        alt="${data.title} ${data.type} 間取り図"
        class="modal-plan-image"
      >
    `;


    /* 説明文 */

    modalText.textContent =
      data.description;


    /* モーダルを開く */

    modal.classList.add("open");

    modal.setAttribute(
      "aria-hidden",
      "false"
    );


    /*
       モーダル表示中は
       後ろのページをスクロールさせない
    */

    document.body.style.overflow =
      "hidden";

  });

});


/* ==================================================
   CLOSE MODAL
================================================== */

function closeModal() {

  modal.classList.remove("open");

  modal.setAttribute(
    "aria-hidden",
    "true"
  );

  document.body.style.overflow =
    "";

}


/*
   × ボタン
*/

modalClose.addEventListener(
  "click",
  closeModal
);


/*
   黒い背景部分をクリックしても閉じる

   モーダルの白いボックス自体を押した場合は
   閉じない
*/

modal.addEventListener("click", (event) => {

  if (event.target === modal) {
    closeModal();
  }

});


/*
   Escキーでも閉じる
*/

document.addEventListener("keydown", (event) => {

  if (
    event.key === "Escape" &&
    modal.classList.contains("open")
  ) {

    closeModal();

  }

});


/* ==================================================
   CONTACT FORM
================================================== */

/*
   今回はポートフォリオ用なので
   実際にはメールを送信しない。

   送信ボタンを押したら
   デモメッセージを表示する。
*/

contactForm.addEventListener("submit", (event) => {

  event.preventDefault();


  showToast(
    "お問い合わせありがとうございます。※これはデモ送信です。"
  );


  /*
     入力された内容をリセット
  */

  contactForm.reset();

});


/* ==================================================
   TOAST MESSAGE
================================================== */

let toastTimer;

function showToast(message) {

  toast.textContent = message;

  toast.classList.add("show");


  /*
     前のタイマーが残っていた場合は
     一度リセット
  */

  clearTimeout(toastTimer);


  /*
     3秒後にメッセージを非表示
  */

  toastTimer = setTimeout(() => {

    toast.classList.remove("show");

  }, 3000);

}


/* ==================================================
   SMOOTH SCROLL
================================================== */

/*
   #から始まるリンクをクリックした時に
   なめらかに移動する
*/

document.querySelectorAll('a[href^="#"]').forEach((link) => {

  link.addEventListener("click", (event) => {

    const targetId =
      link.getAttribute("href");


    /*
       href="#"だけの場合は処理しない
    */

    if (
      !targetId ||
      targetId === "#"
    ) {

      return;

    }


    const target =
      document.querySelector(targetId);


    if (!target) {
      return;
    }


    event.preventDefault();


    /*
       固定ヘッダー分だけ少し上に余白を取る
    */

    const headerHeight =
      header.offsetHeight;

    const targetPosition =
      target.getBoundingClientRect().top +
      window.scrollY -
      headerHeight;


    window.scrollTo({
      top: targetPosition,
      behavior: "smooth"
    });

  });

});
