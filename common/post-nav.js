/* ============================
   공통 글 네비게이션 스크립트
   ============================ */

// 현재 파일 경로 정보
const fullPath = window.location.pathname;
const currentFile = fullPath.split('/').pop();

// 폴더 경로만 정확히 추출
const basePath = fullPath.substring(0, fullPath.lastIndexOf('/') + 1);

// 번호 추출 (001, 002 등)
const currentNum = parseInt(currentFile.match(/\d+/)[0], 10);

// prefix 추출 (case, essay, insight, small 등)
const prefix = currentFile.replace(/\d+\.html/, "");

/* ----------------------------
   이전/다음 글 이동 기능
----------------------------- */
const movePost = (offset) => {
  const next = currentNum + offset;

  if (next < 1) {
    alert("첫 번째 글입니다.");
    return;
  }

  const target = `${basePath}${prefix}${String(next).padStart(3, '0')}.html`;

  fetch(target)
    .then(res => {
      if (res.ok) {
        location.href = target;
      } else {
        alert("마지막 글입니다.");
      }
    })
    .catch(() => alert("해당 글이 없습니다."));
};

const goPrev = () => movePost(-1);
const goNext = () => movePost(1);

/* ----------------------------
   홈으로 돌아가기 기능
   (현재 카테고리 기억)
----------------------------- */
const goHome = () => {
  // prefix가 카테고리 이름과 동일하므로 그대로 사용
  location.href = `../index.html#${prefix}`;
};

/* ----------------------------
   글 제목 자동 표시 기능
----------------------------- */
const loadTitle = () => {
  fetch("../index.html")
    .then(res => res.text())
    .then(html => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");

      // index.html의 모든 글 링크 가져오기
      const links = doc.querySelectorAll("a.case-link, a.essay-link, a.insight-link, a.small-link");

      links.forEach(link => {
        const href = link.getAttribute("href");

        // 현재 페이지 파일명과 일치하는 링크 찾기
        if (href.includes(currentFile)) {
          const title = link.querySelector("h4").innerText;
          document.getElementById("post-title").innerText = title;
        }
      });
    });
};

loadTitle();
