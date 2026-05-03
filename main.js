//TODO add imports if needed
//TODO doc
/**
 * The main function which calls the application. 
 * Please, add specific description here for the application purpose.
 * @param {object} dtoIn contains count of employees, age limit of employees {min, max}
 * @returns {object} containing the statistics
 */
export function main(dtoIn) {
  const employees = generateEmployeeData(dtoIn);
  return getEmployeeStatistics(employees);
}

/**
 * Generates requested number of employees, utilizes functions from bellow, generates a random age and then throws that into a factory to generate everything else
 * @param {object} dtoIn contains count of employees, age limit of employees {min, max}
 * @returns {Array} of employees
 */
export function generateEmployeeData(dtoIn) {
  const { count, age } = dtoIn;
  let dtoOut=[];
  for (let i = 0; i < count; i++) {
    const randomAge = getRandomAge(age.min, age.max);
    const employee = createRandomEmployee(randomAge);
    dtoOut.push(employee);
  }
  return dtoOut;
}


/**
 * Please, add specific description here 
 * @param {Array} employees containing all the mocked employee data
 * @param {object} total number of all objects in array, made to make sure that we dont count the same thing twice
 * @returns {object} statistics of the employees
 */
export function getEmployeeStatistics(employees) {
  const workload10 = employees.filter(e => e.workload === 10).length;
  const workload20 = employees.filter(e => e.workload === 20).length;
  const workload30 = employees.filter(e => e.workload === 30).length;
  const workload40 = employees.filter(e => e.workload === 40).length;
  const allAges = getSortedAges(employees);
  const ageStatistics = getAgeStatistics(allAges);
  const totalWorkload = employees.reduce((sum, e) => sum + e.workload, 0);
  const sortedEmployeesByWorkload = sortEmployeesByWorkload(employees);
  return {
    total: totalWorkload,
    workload10,
    workload20,
    workload30,
    workload40,
    averageAge: Math.round(ageStatistics.averageAge * 10) / 10,
    minAge: Math.trunc(ageStatistics.minAge),
    maxAge: Math.trunc(ageStatistics.maxAge),
    medianAge: Math.trunc(ageStatistics.medianAge),
    medianWorkload: getMedianWomanWorkload(sortedEmployeesByWorkload),
    averageWomenWorkload: Math.round(getAverageWomenWorkload(sortedEmployeesByWorkload)),
    sortedByWorkload: sortedEmployeesByWorkload
  };
}

/**
 * Sorts array of employees in an ascending order by workload
 * @param {*} employees containin all the employee data
 */
function sortEmployeesByWorkload(employees){
    return Array.from(employees).sort((a, b) => a.workload - b.workload);
}

function getSortedAges(employees) {
  const now = new Date();
  const msPerYear = 1000 * 60 * 60 * 24 * 365.25;
  return employees
    .map(e => (now - new Date(e.birthdate)) / msPerYear)
    .sort((a, b) => a - b);
  }

function getAgeStatistics(ages)
{
  const averageAge=ages.reduce((sum, age) => sum + age, 0) / ages.length;
  const minAge=ages[0];
  const maxAge=ages[ages.length-1];
  let medianAge=ages[(ages.length/2)-1];
  if (ages.length % 2 === 1) {
    medianAge = ages[Math.floor(ages.length / 2)];
  } else {
    const mid1 = ages[ages.length / 2 - 1];
    const mid2 = ages[ages.length / 2];
    medianAge = (mid1 + mid2) / 2;
  }
  return {
    averageAge,
    minAge,
    maxAge,
    medianAge
  }; 
}

function getMedianWomanWorkload(sortedEmployeesByWorkload){
     const n = sortedEmployeesByWorkload.length;
  let medianWorkload;
  if (n % 2 === 1) {
    // odd → middle value
    medianWorkload = sortedEmployeesByWorkload[Math.floor(n / 2)].workload;
  } else {
    // even → average of two middle values
    const mid1 = sortedEmployeesByWorkload[n / 2 - 1].workload;
    const mid2 = sortedEmployeesByWorkload[n / 2].workload;
    medianWorkload = (mid1 + mid2) / 2;
  }
  return medianWorkload;
}

function getAverageWomenWorkload(sortedEmployeesByWorkload){
  const women = sortedEmployeesByWorkload.filter(e => e.gender === "female");
  const averageWomenWorkload =
    women.reduce((sum, e) => sum + e.workload, 0) / women.length;
  return averageWomenWorkload;

}
//---------------------FUNCTIONS FROM HOMEWORK 3----------------------------------------------------------------------
let Gender=Object.freeze({
  MALE: "male",
  FEMALE: "female"
});

let WorkingHours=Object.freeze({
  FULLTIME: 40,
  MAJORITY: 30,
  PARTTIME: 20,
  QUARTER:10
})

const firstNames = [
  "Jan", "Jakub", "Josef", "Petr", "Martin", "Tomáš", "Jiří", "Ondřej", "Adam", "Filip",
  "David", "Daniel", "Vojtěch", "Matěj", "Lukáš", "Marek", "Dominik", "Šimon", "Tobiáš", "Václav",
  "Eliška", "Anna", "Tereza", "Marie", "Lucie", "Adéla", "Ema", "Natálie", "Sofie", "Viktorie",
  "Nela", "Julie", "Laura", "Barbora", "Veronika", "Kristýna", "Sára", "Emma", "Kateřina", "Jana",
  "Helena", "Alžběta", "Denisa", "Monika", "Eva", "Hana", "Ivana", "Zuzana", "Daniela", "Petra"
];

const lastNames = [
  "Novák", "Nováková", "Svoboda", "Svobodová", "Novotný", "Novotná",
  "Dvořák", "Dvořáková", "Černý", "Černá", "Procházka", "Procházková",
  "Veselý", "Veselá", "Horák", "Horáková", "Marek", "Pokorný",
  "Pokorná", "Marková", "Pospíšil", "Hájek", "Beneš", "Benešová",
  "Král", "Králová", "Fiala", "Fialová", "Zeman", "Zemanová",
  "Doležal", "Doležalová", "Navrátil", "Navrátilová", "Urban", "Urbanová",
  "Růžička", "Němec", "Kopecký", "Kopecká", "Blažek", "Blažková",
  "Musil", "Musilová", "Malý", "Malá", "Kadlec", "Šimek", "Machová"
];


function getRandomFirstName(){
  let randomIndex=Math.floor(Math.random() * firstNames.length);
  return firstNames[randomIndex];
}

function getRandomLastName(){
  let randomIndex=Math.floor(Math.random() * lastNames.length);
  return lastNames[randomIndex];
}

function getRandomGender() {
  let genders = Object.values(Gender);
  let randomIndex = Math.floor(Math.random() * genders.length);
  return genders[randomIndex];
}

function getRandomWorkingHours(){
  let workingHours=Object.values(WorkingHours);
   let randomIndex = Math.floor(Math.random() * workingHours.length); 
   return workingHours[randomIndex];
}

function getRandomAge(ageMin, ageMax) {
  const min = ageMin;
  const max = ageMax;
  if (min >= max) {
    throw new Error("Invalid range");
  }
  return Math.random() * (max - min) + min;
}

function getRandomBirthDate(age) {
  const ageInMs = age * (365.25 * 24 * 60 * 60 * 1000);
  const birthDate = new Date(new Date().getTime() - ageInMs);
  return birthDate.toISOString();
}

function createRandomEmployee(age) {
  const generatedName = getRandomFirstName();
  const generatedSurname = getRandomLastName(); 
  const generatedGender = getRandomGender();
  const generatedWorkingHours = getRandomWorkingHours();
  const generatedBirthDate = getRandomBirthDate(age); 
  return {gender: generatedGender, birthdate: generatedBirthDate, name: generatedName, surname: generatedSurname, workload: generatedWorkingHours }; 
}