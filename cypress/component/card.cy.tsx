import { mount } from "cypress/react18";
import { Card, currencyFormatter } from "../../src/card";

const getTotal = () => {
  return cy.get('[data-testid="total"]').then(($total) => {
    return $total.text();
  });
};

const getDate = () => {
  return cy.get('[data-testid="date"]').then(($month) => {
    return $month.text();
  });
};

const nextMonth = () => {
  return cy.get('[data-testid="next-month"]');
};

const prevMonth = () => {
  return cy.get('[data-testid="prev-month"]');
};

const getSummary = () => {
  return cy.get('[data-testid="summary"]').then(($summary) => {
    return $summary.text();
  });
};

const getDonation = () => cy.get("[data-testid='donation']");

describe("Card", () => {
  beforeEach(() => {
    mount(<Card />);
  });

  it("should display total of 0$", () => {
    getTotal().should("eq", currencyFormatter.format(0));
  });

  it("should display initial month if we got 4 months ahead and 5 months back", () => {
    getDate().then((month) => {
      const initMonth = month;
      for (let i = 0; i < 4; i++) {
        nextMonth().click();
        getDate().should("not.eq", initMonth);
      }
      for (let i = 0; i < 5; i++) {
        prevMonth().click();
      }

      getDate().should("eq", initMonth);
    });
  });

  it("should display total of 786.42$ and summary of 131.07 after declaring 131.07 donation for 6 months", () => {
    getDonation().should("exist").type("131.07");
    for (let i = 0; i < 6; i++) {
      nextMonth().click();
    }
    getTotal().should("eq", currencyFormatter.format(786.42));
    getSummary().then((summary) => {
      expect(summary).to.contain(currencyFormatter.format(131.07));
    });
  });

  it("should display total of 2469.33$ and summary of 823.11 after declaring 823.11 donation for 3 months", () => {
    getDonation().should("exist").type("823.11");
    for (let i = 0; i < 3; i++) {
      nextMonth().click();
    }

    getTotal().should("eq", currencyFormatter.format(2469.33));
    getSummary().then((summary) => {
      expect(summary).to.contain(currencyFormatter.format(823.11));
    });
  });
});
