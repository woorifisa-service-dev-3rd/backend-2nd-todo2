// cypress 정상 동작 테스트용 테스트 케이스
describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://example.cypress.io')
  })
});

//npx cypress open
describe('# 문제1 - 할 일 삭제 전 삭제 확인 안내 기능', () => {
  beforeEach(() => {
      cy.visit('http://localhost:5173/');
      cy.wait(1000);
  });

  it('휴지통 버튼 클릭 시 삭제 확인 안내 모달이 활성화된다.', () => {
      cy.get('[data-cy="recycle-bin"]:first').click();
      cy.wait(1000);
  })

  it('삭제 확인 안내 모달에서 삭제 버튼 클릭 시 해당 할 일이 제거된다.', () => {
      cy.get('[data-cy="recycle-bin"]:first').click();

      // 삭제 버튼 클릭
      cy.get('[data-cy="process-remove"]').click();

      // 할 일 목록 화면에서 "React 공부" 할 일이 존재하는지 확인
      // cy.contains('React 공부').should('exist'); // 삭제가 안되었을 경우 해당 코드가 통과하게됨
      cy.contains('React 공부').should('not.exist');
  });

  it('삭제 확인 안내 모달에서 취소 버튼 클릭 시 삭제 처리를 수행하지 않고 모달이 비활성화된다.', () => {
      cy.get('[data-cy="recycle-bin"]:first').click();

      cy.get('[data-cy="process-cancel"]').click();

      cy.contains('React 공부').should('exist'); // 삭제가 안되었기 때문에 해당 코드가 통과하게됨
  });

});

//it.skip

describe('# 문제2 - 할 일 마감 기한 등록 기능', () => {
  beforeEach(() => {
      cy.visit('http://localhost:5173/')
  });

  it('할 일 등록 폼에 날짜를 입력할 수 있는 항목이 존재한다.', () => {
      // Add Todo 버튼
      cy.get('[data-cy="add-todo-button"]:first').click();

      // 날짜 입력 폼이 존재하는지 확인
      cy.get('input[type=date]').should('exist');
  });

});

describe('# 문제3 - 등록된 할 일의 마감기한 표시 기능', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/')
  });

  it('할 일이 등록되면 할 일 목록에 등록한 새로운 할 일이 추가되어 표시된다.', () => {
    cy.get('[data-cy="add-todo-button"]:first').click();

    // 할 일 입력
    cy.get('#title').type('실기 문제풀기');
    cy.wait(500);
    cy.get('#summary').type('실기 평가를 통과한다.. 제발!!');
    cy.wait(500);
    cy.get('#category').select('PROGRESS');
    cy.wait(500);
    cy.get('#deadline').type('2024-08-05');
    cy.wait(500);

    // 할일 추가
    cy.get('[data-cy="process-add-or-update"]').click();

    cy.contains('실기 문제풀기').should('exist');
    
});

it('8월 5일 기준으로 8월 7일에 수행할 할 일 등록 시, 등록된 할 일에 "2일 남음"이라는 문구가 표시된다.', () => {
    cy.wait(2000);
    cy.get('[data-cy="add-todo-button"]').click();

    // 할 일 입력
    cy.get('#title').type('백엔드 공부');
    cy.wait(500);
    cy.get('#summary').type('백엔드 공부를 시작한다.');
    cy.wait(500);
    cy.get('#category').select('TODO');
    cy.wait(500);
    cy.get('#deadline').type('2024-08-07');
    cy.wait(1500);

    // 할일 추가
    cy.get('[data-cy="process-add-or-update"]').click();
    cy.wait(2000);
    
    cy.get('[data-cy="todo-item"]:last').within(() => {
        cy.contains(`2일 남음`).should('exist');
    })

});
})

describe('# 문제4 - 브라우저 push 알림 기능', () => {
  beforeEach(() => {
      cy.visit('http://localhost:5173/')
  });

  it('# 새로운 할 일을 등록할 경우 브라우저 push 알림이 전송된다.', () => {
      // Add Todo 버튼
      cy.wait(2000);
      cy.get('[data-cy="add-todo-button"]:first').click();

      // 할 일 입력
      cy.get('#title').type('실기 문제풀기');
      cy.wait(500);
      cy.get('#summary').type('실기 평가를 잘 본다.. 제발!!');
      cy.wait(500);
      cy.get('#category').select('PROGRESS');
      cy.wait(500);
      cy.get('#deadline').type('2024-08-05');
      cy.wait(1500);

      // 할일 추가
      cy.get('[data-cy="process-add-or-update"]').click();
      cy.wait(3000);
      
      // ** push 알림 테스트 성공 여부는 눈(Eye)으로 확인하는 걸로 대체 ** 
  });
  
});

// 문제5 ~ 6번은 사용자의 이벤트에 따라 화면 상에서 보이는 동작 결과를 화면 캡쳐 후 제출할 것
// → 각 문제별 구글 폼에 제공된 예시 이미지처럼 캡쳐

// 캡쳐한 이미지 파일 이름 규칙
// 문제5 - ex5.png
// 문제6 - ex6.png
// 캡쳐한 결과 이미지는 자신의 제출용 폴더인 '번호.이름/' 폴더에 저장 후 제출