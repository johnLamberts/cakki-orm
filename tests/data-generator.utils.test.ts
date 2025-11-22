// tests/utils/data-generator.test.ts

import DataGenerator from "../src/utils/data-generator.utils";


describe('DataGenerator', () => {
  describe('Random Numbers', () => {
    it('should generate random integer within range', () => {
      const value = DataGenerator.randomInt(1, 10);
      expect(value).toBeGreaterThanOrEqual(1);
      expect(value).toBeLessThanOrEqual(10);
      expect(Number.isInteger(value)).toBe(true);
    });

    it('should generate random float within range', () => {
      const value = DataGenerator.randomFloat(1.5, 10.5, 2);
      expect(value).toBeGreaterThanOrEqual(1.5);
      expect(value).toBeLessThanOrEqual(10.5);
      expect(value.toString().split('.')[1]?.length || 0).toBeLessThanOrEqual(2);
    });

    it('should generate random boolean', () => {
      const values = Array.from({ length: 100 }, () => DataGenerator.randomBoolean());
      expect(values.some(v => v === true)).toBe(true);
      expect(values.some(v => v === false)).toBe(true);
    });
  });

  describe('Random Strings', () => {
    it('should generate random string of specified length', () => {
      const str = DataGenerator.randomString(10);
      expect(str.length).toBe(10);
      expect(/^[a-zA-Z0-9]+$/.test(str)).toBe(true);
    });

    it('should generate alphanumeric string', () => {
      const str = DataGenerator.randomString(20, 'alphanumeric');
      expect(/^[a-zA-Z0-9]+$/.test(str)).toBe(true);
    });

    it('should generate lowercase string', () => {
      const str = DataGenerator.randomString(15, 'lowercase');
      expect(/^[a-z]+$/.test(str)).toBe(true);
    });

    it('should generate uppercase string', () => {
      const str = DataGenerator.randomString(15, 'uppercase');
      expect(/^[A-Z]+$/.test(str)).toBe(true);
    });

    it('should generate numeric string', () => {
      const str = DataGenerator.randomString(8, 'numeric');
      expect(/^[0-9]+$/.test(str)).toBe(true);
    });

    it('should generate hex string', () => {
      const str = DataGenerator.randomString(12, 'hex');
      expect(/^[0-9a-f]+$/.test(str)).toBe(true);
    });
  });

  describe('Email Generation', () => {
    it('should generate valid email address', () => {
      const email = DataGenerator.randomEmail();
      expect(email).toMatch(/^[a-z]+@example\.com$/);
    });

    it('should generate email with custom domain', () => {
      const email = DataGenerator.randomEmail('test.org');
      expect(email).toMatch(/^[a-z]+@test\.org$/);
    });
  });

  describe('Name Generation', () => {
    it('should generate first name', () => {
      const firstName = DataGenerator.randomFirstName();
      expect(firstName.length).toBeGreaterThan(0);
      expect(typeof firstName).toBe('string');
    });

    it('should generate last name', () => {
      const lastName = DataGenerator.randomLastName();
      expect(lastName.length).toBeGreaterThan(0);
      expect(typeof lastName).toBe('string');
    });

    it('should generate full name', () => {
      const fullName = DataGenerator.randomFullName();
      expect(fullName).toMatch(/^[A-Z][a-z]+ [A-Z][a-z]+$/);
    });
  });

  describe('Date Generation', () => {
    it('should generate random date between two dates', () => {
      const start = new Date('2020-01-01');
      const end = new Date('2023-12-31');
      const date = DataGenerator.randomDate(start, end);
      
      expect(date.getTime()).toBeGreaterThanOrEqual(start.getTime());
      expect(date.getTime()).toBeLessThanOrEqual(end.getTime());
    });

    it('should generate date in the past', () => {
      const date = DataGenerator.randomDateInPast(30);
      const now = new Date();
      const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      
      expect(date.getTime()).toBeGreaterThanOrEqual(thirtyDaysAgo.getTime());
      expect(date.getTime()).toBeLessThanOrEqual(now.getTime());
    });
  });

  describe('UUID Generation', () => {
    it('should generate valid UUID v4', () => {
      const uuid = DataGenerator.randomUUID();
      expect(uuid).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
    });

    it('should generate unique UUIDs', () => {
      const uuids = Array.from({ length: 100 }, () => DataGenerator.randomUUID());
      const uniqueUuids = new Set(uuids);
      expect(uniqueUuids.size).toBe(100);
    });
  });

  describe('Array Element Selection', () => {
    const testArray = ['a', 'b', 'c', 'd', 'e'];

    it('should pick random element from array', () => {
      const element = DataGenerator.randomElement(testArray);
      expect(testArray).toContain(element);
    });

    it('should pick multiple random elements', () => {
      const elements = DataGenerator.randomElements(testArray, 3);
      expect(elements.length).toBe(3);
      elements.forEach(el => expect(testArray).toContain(el));
    });

    it('should not pick more elements than available', () => {
      const elements = DataGenerator.randomElements(testArray, 10);
      expect(elements.length).toBeLessThanOrEqual(testArray.length);
    });
  });

  describe('Address Generation', () => {
    it('should generate street address', () => {
      const address = DataGenerator.randomAddress();
      expect(address).toMatch(/^\d+ .+$/);
    });

    it('should generate city name', () => {
      const city = DataGenerator.randomCity();
      expect(city.length).toBeGreaterThan(0);
    });

    it('should generate state code', () => {
      const state = DataGenerator.randomState();
      expect(state.length).toBe(2);
      expect(/^[A-Z]{2}$/.test(state)).toBe(true);
    });

    it('should generate ZIP code', () => {
      const zip = DataGenerator.randomZipCode();
      expect(zip.length).toBe(5);
      expect(/^\d{5}$/.test(zip)).toBe(true);
    });

    it('should generate country', () => {
      const country = DataGenerator.randomCountry();
      expect(country.length).toBeGreaterThan(0);
    });
  });

  describe('Contact Generation', () => {
    it('should generate US phone number', () => {
      const phone = DataGenerator.randomPhone('US');
      expect(phone).toMatch(/^\+1-\d{3}-\d{3}-\d{4}$/);
    });

    it('should generate UK phone number', () => {
      const phone = DataGenerator.randomPhone('UK');
      expect(phone).toMatch(/^\+44-\d{4}-\d{6}$/);
    });
  });

  describe('IP Address Generation', () => {
    it('should generate valid IPv4 address', () => {
      const ip = DataGenerator.randomIPv4();
      const parts = ip.split('.');
      
      expect(parts.length).toBe(4);
      parts.forEach(part => {
        const num = parseInt(part);
        expect(num).toBeGreaterThanOrEqual(0);
        expect(num).toBeLessThanOrEqual(255);
      });
    });
  });

  describe('Username Generation', () => {
    it('should generate username', () => {
      const username = DataGenerator.randomUsername();
      expect(username).toMatch(/^[a-z]+_[a-z]+\d{1,3}$/);
    });
  });

  describe('Password Generation', () => {
    it('should generate password of specified length', () => {
      const password = DataGenerator.randomPassword(16);
      expect(password.length).toBe(16);
    });

    it('should generate password with mixed characters', () => {
      const password = DataGenerator.randomPassword(20);
      
      expect(/[a-z]/.test(password)).toBe(true); // Has lowercase
      expect(/[A-Z]/.test(password)).toBe(true); // Has uppercase
      expect(/\d/.test(password)).toBe(true);     // Has number
      expect(/[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(password)).toBe(true); // Has symbol
    });
  });

  describe('URL Generation', () => {
    it('should generate valid URL', () => {
      const url = DataGenerator.randomURL();
      expect(url).toMatch(/^https?:\/\/[a-z]+\.[a-z]+$/);
    });
  });

  describe('Text Generation', () => {
    it('should generate paragraph with specified sentences', () => {
      const paragraph = DataGenerator.randomParagraph(3);
      const sentences = paragraph.split('. ');
      
      expect(sentences.length).toBeGreaterThanOrEqual(3);
      expect(paragraph.charAt(0)).toMatch(/[A-Z]/); // Starts with capital
    });

    it('should generate paragraph with default sentence count', () => {
      const paragraph = DataGenerator.randomParagraph();
      expect(paragraph.length).toBeGreaterThan(0);
    });
  });

  describe('Bulk Data Generation', () => {
    it('should generate bulk data using generator function', () => {
      const data = DataGenerator.generateBulkData(100, () => ({
        id: DataGenerator.randomInt(1, 1000),
        name: DataGenerator.randomFullName(),
        email: DataGenerator.randomEmail(),
      }));

      expect(data.length).toBe(100);
      expect(data[0]).toHaveProperty('id');
      expect(data[0]).toHaveProperty('name');
      expect(data[0]).toHaveProperty('email');
    });

    it('should generate bulk data with progress callback', () => {
      const progressUpdates: number[] = [];
      
      const data = DataGenerator.generateBulkDataWithProgress(
        1000,
        (index) => ({ id: index }),
        (current, total, percentage) => {
          progressUpdates.push(percentage);
        }
      );

      expect(data.length).toBe(1000);
      expect(progressUpdates.length).toBeGreaterThan(0);
      expect(progressUpdates[progressUpdates.length - 1]).toBe(100);
    });
  });

  describe('Color Generation', () => {
    it('should generate valid hex color', () => {
      const color = DataGenerator.randomColor();
      expect(color).toMatch(/^#[0-9a-f]{6}$/);
    });
  });

  describe('JSON Generation', () => {
    it('should generate random JSON object', () => {
      const json = DataGenerator.randomJSON(2);
      expect(typeof json).toBe('object');
      expect(Object.keys(json).length).toBeGreaterThan(0);
    });

    it('should respect depth parameter', () => {
      const json = DataGenerator.randomJSON(0);
      expect(['string', 'number', 'boolean']).toContain(typeof json);
    });
  });

  describe('Business Data Generation', () => {
    it('should generate status', () => {
      const status = DataGenerator.randomStatus();
      expect(['active', 'inactive', 'pending', 'suspended', 'deleted']).toContain(status);
    });

    it('should generate price', () => {
      const price = DataGenerator.randomPrice(50, 500);
      expect(price).toBeGreaterThanOrEqual(50);
      expect(price).toBeLessThanOrEqual(500);
      expect(price.toString().split('.')[1]?.length || 0).toBeLessThanOrEqual(2);
    });

    it('should generate company name', () => {
      const company = DataGenerator.randomCompanyName();
      expect(company.split(' ').length).toBe(2);
    });

    it('should generate job title', () => {
      const jobTitle = DataGenerator.randomJobTitle();
      expect(jobTitle.length).toBeGreaterThan(0);
    });
  });

  describe('Performance', () => {
    it('should generate 10000 emails quickly', () => {
      const start = Date.now();
      
      for (let i = 0; i < 10000; i++) {
        DataGenerator.randomEmail();
      }
      
      const duration = Date.now() - start;
      expect(duration).toBeLessThan(1000); // Should complete in less than 1 second
    });

    it('should generate 1000 full records quickly', () => {
      const start = Date.now();
      
      const data = DataGenerator.generateBulkData(1000, () => ({
        id: DataGenerator.randomInt(1, 100000),
        email: DataGenerator.randomEmail(),
        name: DataGenerator.randomFullName(),
        age: DataGenerator.randomInt(18, 80),
        address: DataGenerator.randomAddress(),
        city: DataGenerator.randomCity(),
        state: DataGenerator.randomState(),
        zip: DataGenerator.randomZipCode(),
        phone: DataGenerator.randomPhone(),
        status: DataGenerator.randomStatus(),
      }));
      
      const duration = Date.now() - start;
      expect(data.length).toBe(1000);
      expect(duration).toBeLessThan(2000); // Should complete in less than 2 seconds
    });
  });
});
