// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G']
  return dnaBases[Math.floor(Math.random() * 4)] 
}

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = []
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase())
  }
  return newStrand;
};

const pAequorFactory = (specimenNum, dna) => {
  return {
    specimenNum,
    dna,
    mutate() {
      const totalBases = this.dna.length;
      const randomIndex = Math.floor(Math.random() * totalBases);
      const currentBase = this.dna[randomIndex];
      let newBase = returnRandBase();
      while (currentBase === newBase) {
        newBase = returnRandBase();
      }
      this.dna[randomIndex] = newBase;
      return this.dna;
    },
    compareDNA(anotherSpecimen) {
      const totalBases = this.dna.length;
      let commonBases = 0;
      for (let i = 0; i < totalBases; i++) {
        if (this.dna[i] === anotherSpecimen.dna[i]) {
          commonBases++;
        }
      }
      const commonPercentage = (commonBases / totalBases) * 100;
      console.log(
        `specimen #${this.specimenNum} and specimen #${
          anotherSpecimen.specimenNum
        } have ${commonPercentage.toFixed(2)}% DNA in common`
      );
    },
    willLikelySurvive() {
      const totalBases = this.dna.length;
      let cOrGBases = 0;
      for (let i = 0; i < totalBases; i++) {
        if (this.dna[i] === "C" || this.dna[i] === "G") {
          cOrGBases++;
        }
      }
      const cOrGPercentage = (cOrGBases / totalBases) * 100;
      return cOrGPercentage >= 60;
    },
    complementStrand() {
      const totalBases = this.dna.length;
      const complementaryDna = [];
      for (let i = 0; i < totalBases; i++) {
        const base = this.dna[i];
        switch (base) {
          case "A":
            complementaryDna[i] = "T";
            break;
          case "T":
            complementaryDna[i] = "A";
            break;
          case "C":
            complementaryDna[i] = "G";
            break;
          case "G":
            complementaryDna[i] = "C";
            break;
        }
      }
      return complementaryDna;
    },
  };
};

const survivingpAequors = [];
while (survivingpAequors.length < 30) {
  const pAequor = pAequorFactory(survivingpAequors.length + 1, mockUpStrand());
  if (pAequor.willLikelySurvive()) {
    survivingpAequors.push(pAequor);
  }
}

const pAequor = pAequorFactory(1, [
  "T",
  "A",
  "C",
  "A",
  "G",
  "A",
  "T",
  "A",
  "C",
  "G",
  "A",
  "C",
  "G",
  "A",
  "T",
]);
// console.log(survivingpAequors);
// Uncomment the above to check surviving specimen
console.log(pAequor.dna);
console.log(pAequor.complementStrand());


