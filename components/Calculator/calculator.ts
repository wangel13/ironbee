import reduce from "lodash/reduce";
import get from "lodash/get";

export class Calculator3000 {
  industryKeys: any;
  equipmentsKeys: any;
  areaKeys: any;
  legalFormsKeys: any;
  data: any;
  patentsKeys: any;

  constructor(
    data: any,
    industryKeys: any,
    equipmentsKeys: any,
    areaKeys: any,
    legalFormsKeys: any,
    patentsKeys: any
  ) {
    this.data = data;
    this.industryKeys = industryKeys;
    this.equipmentsKeys = equipmentsKeys;
    this.areaKeys = areaKeys;
    this.legalFormsKeys = legalFormsKeys;
    this.patentsKeys = patentsKeys;
  }

  calcEquipment() {
    const equipment = this.data?.equipment;

    const equipmentPrice = reduce(
      equipment,
      (acc, item) => {
        const equipmentId = get(item, "type.value");
        const equipmentCount = get(item, "count", 0);
        const equipmentPrice = get(
          this.equipmentsKeys,
          [equipmentId, "avgCost"],
          0
        );
        return acc + equipmentCount * equipmentPrice;
      },
      0
    );
    return equipmentPrice;
  }

  calcAreaBuildingCost() {
    const areaBuildingCost = 100000;
    const areaBuildingSize = get(this.data, "areaBuildingSize", 0);

    const areaCost = areaBuildingCost * areaBuildingSize;
    return areaCost;
  }

  calcAreaBuildingTaxes() {
    const areaBuildingCost = this.calcAreaBuildingCost();
    return areaBuildingCost * 0.05;
  }

  calcAreaCost() {
    const area = get(this.areaKeys, this.data?.area?.value);
    const areaSize = get(this.data, "areaSize", 0);

    const areaCost = get(area, "avgCost", 0) * areaSize * 0.0165;
    return areaCost;
  }

  calcWorkersTaxes() {
    // Считаем расходы на сотрудников
    let workersSalary = this.calcWorkersSalary();
    // Налоги
    const workersTaxes = workersSalary * (0.22 + 0.051);
    return workersTaxes;
  }

  // НЕ УЧАСТВУЕТ В ОБЩЕМ РАСЧЕТЕ, так как есть - calcWorkersTaxes
  calcWorkersMedTaxes() {
    let workersSalary = this.calcWorkersSalary();
    return workersSalary * 0.051;
  }

  // НЕ УЧАСТВУЕТ В ОБЩЕМ РАСЧЕТЕ, так как есть - calcWorkersTaxes
  calcWorkersPensionTaxes() {
    let workersSalary = this.calcWorkersSalary();
    return workersSalary * 0.22;
  }

  calcWorkersSalary() {
    const industryId = this.data?.industry?.value;
    const industry = get(this.industryKeys, industryId);
    const workersCount = get(this.data, "workersCount", 0);

    // Считаем расходы на сотрудников
    let workersSalary = workersCount * industry?.avgSalary * 12;
    return workersSalary;
  }

  calcStateDuty() {
    const legalFormId = this.data?.legalForm?.value;
    const legalForm = get(this.legalFormsKeys, legalFormId);
    return get(legalForm, "stateDuty", 0);
  }

  calcBuhAvgCost() {
    const usn = this.data?.usn;
    const legalFormId = this.data?.legalForm?.value;
    const legalForm = get(this.legalFormsKeys, legalFormId);

    if (usn) {
      return get(legalForm, "usnBuhAvgCost", 0) * 12;
    }
    if (!usn) {
      return get(legalForm, "osnBuhAvgCost", 0) * 12;
    }

    return 0;
  }

  calcAvgTaxes() {
    const industryId = this.data?.industry?.value;
    const industry = get(this.industryKeys, industryId);

    return get(industry, "avgTaxes", 0);
  }

  calcAvgIncomeTaxes() {
    const industryId = this.data?.industry?.value;
    const industry = get(this.industryKeys, industryId);

    return get(industry, "avgIncomeTaxes", 0);
  }

  calcAvgPropertyTaxes() {
    const industryId = this.data?.industry?.value;
    const industry = get(this.industryKeys, industryId);

    return get(industry, "avgPropertyTaxes", 0);
  }

  calcAreaTaxes() {
    return this.calcAreaCost() * 0.015;
  }

  calcAvgLandTaxes() {
    const industryId = this.data?.industry?.value;
    const industry = get(this.industryKeys, industryId);

    return get(industry, "avgLandTaxes", 0);
  }

  calcAvgTransportTaxes() {
    const industryId = this.data?.industry?.value;
    const industry = get(this.industryKeys, industryId);

    return get(industry, "avgTransportTaxes", 0);
  }

  calcAvgOtherTaxes() {
    const industryId = this.data?.industry?.value;
    const industry = get(this.industryKeys, industryId);

    return get(industry, "avgOtherTaxes", 0);
  }

  calcPatents() {
    const patents = this.data?.patents;

    const patentsCost = reduce(
      patents,
      (acc, { value }) => {
        const cost = get(this.patentsKeys, [value, "cost"], 0);
        return acc + cost;
      },
      0
    );

    return patentsCost;
  }

  calcTotal() {
    return (
      this.calcWorkersSalary() +
      this.calcWorkersTaxes() +
      this.calcEquipment() +
      this.calcAreaCost() +
      // this.calcAreaTaxes() +
      this.calcAreaBuildingCost() +
      this.calcAreaBuildingTaxes() +
      this.calcStateDuty() +
      this.calcBuhAvgCost() +
      this.calcAvgIncomeTaxes() +
      // this.calcAvgTaxes() +
      // this.calcAvgPropertyTaxes() +
      // this.calcAvgLandTaxes() +
      this.calcAvgOtherTaxes() +
      this.calcAvgTransportTaxes() +
      this.calcPatents()
    );
  }
}
