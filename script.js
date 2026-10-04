const albumData = {
  "king-of-karaoke": {
    title: "K歌之王 (King of Karaoke)",
    text: "我唱得不夠動人你別皺眉\n我願意和    你約定至死\n我只想嬉    戲唱遊到下世紀\n請你別嫌我將這煽情奉獻給你\n還能憑甚麼 擁抱若未能令你興奮\n便宜地唱出 寫在情歌的性感\n還能憑甚麼 要是愛不可感動人\n俗套的歌詞 煽動你惻忍\n誰人又相信一世一生這膚淺對白\n來吧送給你叫幾百萬人流淚過的歌\n如從未聽過誓言如幸福摩天輪\n才令我因你要呼天叫地愛愛愛愛那麼多\n將我漫天心血一一拋到銀河\n誰是垃圾 誰不捨我難過 分一丁目贈我\n我唱出心裡話時眼淚會流\n要是怕難過抱住我手\n我只得千語萬言放在你心\n比渴望地老天荒更簡單未算罕有\n誰人又相信一世一生這膚淺對白\n來吧送給你叫幾百萬人流淚過的歌\n如從未聽過誓言如幸福摩天輪\n才令我因你要呼天叫地愛愛愛愛那麼多\n給你用力作二十首不捨不棄\n還附送你愛得過火\n給你賣力唱二十首真心真意\n米高峰都因我動容 無人及我\n你怎麼竟然說K歌之王 是我\n我只想跟你未來浸在愛河\n而你那呵欠絕得不能絕 絕到溶掉我"
  },
  "under-mount-fuji": {
    title: "富士山下 (Under Mount Fuji)",
    text: "A poetic meditation on unrequited love and the quiet ache of watching life move on beneath the mountain like a distant memory."
  },
  "exaggerated": {
    title: "浮誇 (Exaggerated)",
    text: "An explosive, theatrical anthem about people putting on a louder, brighter version of themselves to be seen and accepted."
  },
  "ten-years": {
    title: "十年 (Ten Years)",
    text: "A wistful Mandarin classic about time, old love, and the different ways people carry vanished chapters of their lives."
  },
  "warrior-of-darkness": {
    title: "孤勇者 (Warrior of Darkness)",
    text: "A modern anthem of perseverance, courage, and quiet heroism for the people who keep standing despite the fear around them."
  },
  "tourbillon": {
    title: "陀飛輪 (Tourbillon)",
    text: "A philosophical look at time, money, and youth, wrapped in a sleek and elegant song that turns a watch into a metaphor for life."
  }
};

const trackNames = {
  "king-of-karaoke": "K歌之王 (King of Karaoke)",
  "under-mount-fuji": "富士山下 (Under Mount Fuji)",
  "exaggerated": "浮誇 (Exaggerated)",
  "ten-years": "十年 (Ten Years)",
  "warrior-of-darkness": "孤勇者 (Warrior of Darkness)",
  "tourbillon": "陀飛輪 (Tourbillon)"
};

const filterButtons = document.querySelectorAll(".btn");
const filterCards = document.querySelectorAll(".filterDiv");
const modal = document.getElementById("description-modal");
const albumTitleElem = document.getElementById("album-title");
const albumDescElem = document.getElementById("album-description");
const closeModalBtn = document.getElementById("close-modal-btn");
const algoTelemetry = document.getElementById("algo-telemetry");
function filterSelection(category) {
  filterCards.forEach((card) => {
    const matches = category === "all" || card.classList.contains(category);
    card.classList.toggle("show", matches);
  });

  filterButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.filter === category);
  });
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => filterSelection(button.dataset.filter));
});

filterSelection("all");

function fitDescriptionText() {
  if (!modal || !modal.classList.contains("open") || !albumDescElem) return;

  let minimumFontSize = 9;
  let maximumFontSize = 13;//change font size
  let bestFontSize = minimumFontSize;

  for (let attempt = 0; attempt < 14; attempt += 1) {
    const fontSize = (minimumFontSize + maximumFontSize) / 2;
    albumDescElem.style.fontSize = `${fontSize}px`;

    if (albumDescElem.scrollHeight <= albumDescElem.clientHeight) {
      bestFontSize = fontSize;
      minimumFontSize = fontSize;
    } else {
      maximumFontSize = fontSize;
    }
  }

  albumDescElem.style.fontSize = `${bestFontSize.toFixed(1)}px`;

  if (algoTelemetry) {
    algoTelemetry.textContent = `Fit Font Size: ${bestFontSize.toFixed(1)}px (14 Binary Steps)`;
  }
}

function openAlbumPopup(albumKey) {
  const album = albumData[albumKey];
  if (!album || !modal) return;

  if (albumTitleElem) albumTitleElem.textContent = album.title;
  if (albumDescElem) albumDescElem.textContent = album.text;

  modal.classList.add("open");
  fitDescriptionText();

  if (document.fonts) {
    document.fonts.ready.then(fitDescriptionText);
  }
}

function closeAlbumPopup() {
  if (modal) modal.classList.remove("open");
}

document.addEventListener("click", (event) => {
  const lyricButton = event.target.closest(".see-description-btn");
  if (lyricButton) {
    const albumKey = lyricButton.dataset.album;
    openAlbumPopup(albumKey);
  }

  const playButton = event.target.closest(".disco-play");
  if (playButton) {
    const trackKey = playButton.dataset.track;
    const trackName = trackNames[trackKey] || "Selected track";

    document.querySelectorAll(".disco-play").forEach((button) => {
      button.classList.toggle("is-playing", button === playButton);
    });
  }
});

if (closeModalBtn) {
  closeModalBtn.addEventListener("click", closeAlbumPopup);
}

if (modal) {
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeAlbumPopup();
    }
  });
}

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal && modal.classList.contains("open")) {
    closeAlbumPopup();
  }
});

window.addEventListener("resize", fitDescriptionText);