// src/utils/data-generator.ts

/**
 * Data Generator Utility
 * Generates realistic test data for performance testing and seeding
 */
export class DataGenerator {
  /**
   * Generate a random integer between min and max (inclusive)
   */
  static randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * Generate a random float between min and max
   */
  static randomFloat(min: number, max: number, decimals: number = 2): number {
    const value = Math.random() * (max - min) + min;
    return Number(value.toFixed(decimals));
  }

  /**
   * Generate a random boolean value
   */
  static randomBoolean(): boolean {
    return Math.random() >= 0.5;
  }

  /**
   * Generate a random string of specified length
   */
  static randomString(length: number, charset: string = 'alphanumeric'): string {
    let characters = '';
    
    switch (charset) {
      case 'alpha':
        characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        break;
      case 'numeric':
        characters = '0123456789';
        break;
      case 'alphanumeric':
        characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        break;
      case 'lowercase':
        characters = 'abcdefghijklmnopqrstuvwxyz';
        break;
      case 'uppercase':
        characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        break;
      case 'hex':
        characters = '0123456789abcdef';
        break;
      default:
        characters = charset;
    }

    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  /**
   * Generate a random email address
   */
  static randomEmail(domain: string = 'example.com'): string {
    const username = this.randomString(this.randomInt(5, 12), 'lowercase');
    return `${username}@${domain}`;
  }

  /**
   * Generate a random phone number
   */
  static randomPhone(format: string = 'US'): string {
    switch (format) {
      case 'US':
        return `+1-${this.randomInt(200, 999)}-${this.randomInt(200, 999)}-${this.randomInt(1000, 9999)}`;
      case 'UK':
        return `+44-${this.randomInt(1000, 9999)}-${this.randomInt(100000, 999999)}`;
      default:
        return `+${this.randomInt(1, 99)}-${this.randomInt(100000000, 9999999999)}`;
    }
  }

  /**
   * Generate a random date between start and end dates
   */
  static randomDate(start: Date, end: Date): Date {
    const startTime = start.getTime();
    const endTime = end.getTime();
    const randomTime = startTime + Math.random() * (endTime - startTime);
    return new Date(randomTime);
  }

  /**
   * Generate a random date within the last N days
   */
  static randomDateInPast(days: number): Date {
    const now = new Date();
    const past = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
    return this.randomDate(past, now);
  }

  /**
   * Generate a random UUID v4
   */
  static randomUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  /**
   * Pick a random element from an array
   */
  static randomElement<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
  }

  /**
   * Pick multiple random elements from an array
   */
  static randomElements<T>(array: T[], count: number): T[] {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(count, array.length));
  }

  /**
   * Generate a random name (first name)
   */
  static randomFirstName(): string {
    const names = [
      'James', 'Mary', 'John', 'Patricia', 'Robert', 'Jennifer', 'Michael', 'Linda',
      'William', 'Barbara', 'David', 'Elizabeth', 'Richard', 'Susan', 'Joseph', 'Jessica',
      'Thomas', 'Sarah', 'Charles', 'Karen', 'Christopher', 'Nancy', 'Daniel', 'Lisa',
      'Matthew', 'Betty', 'Anthony', 'Margaret', 'Mark', 'Sandra', 'Donald', 'Ashley',
      'Steven', 'Kimberly', 'Paul', 'Emily', 'Andrew', 'Donna', 'Joshua', 'Michelle',
      'Kenneth', 'Dorothy', 'Kevin', 'Carol', 'Brian', 'Amanda', 'George', 'Melissa',
      'Edward', 'Deborah', 'Ronald', 'Stephanie', 'Timothy', 'Rebecca', 'Jason', 'Sharon',
    ];
    return this.randomElement(names);
  }

  /**
   * Generate a random last name
   */
  static randomLastName(): string {
    const names = [
      'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
      'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas',
      'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson', 'White',
      'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson', 'Walker', 'Young',
      'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores',
      'Green', 'Adams', 'Nelson', 'Baker', 'Hall', 'Rivera', 'Campbell', 'Mitchell',
    ];
    return this.randomElement(names);
  }

  /**
   * Generate a random full name
   */
  static randomFullName(): string {
    return `${this.randomFirstName()} ${this.randomLastName()}`;
  }

  /**
   * Generate a random street address
   */
  static randomAddress(): string {
    const streetNumber = this.randomInt(1, 9999);
    const streets = [
      'Main St', 'Oak Ave', 'Maple Dr', 'Cedar Ln', 'Elm St', 'Park Blvd',
      'Washington St', 'Lake Rd', 'Hill Dr', 'Forest Ave', 'River Rd', 'Sunset Blvd',
    ];
    return `${streetNumber} ${this.randomElement(streets)}`;
  }

  /**
   * Generate a random city name
   */
  static randomCity(): string {
    const cities = [
      'New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia',
      'San Antonio', 'San Diego', 'Dallas', 'San Jose', 'Austin', 'Jacksonville',
      'Fort Worth', 'Columbus', 'Charlotte', 'San Francisco', 'Indianapolis', 'Seattle',
      'Denver', 'Boston', 'El Paso', 'Nashville', 'Detroit', 'Portland',
    ];
    return this.randomElement(cities);
  }

  /**
   * Generate a random state/province
   */
  static randomState(): string {
    const states = [
      'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
      'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
      'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
      'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
      'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY',
    ];
    return this.randomElement(states);
  }

  /**
   * Generate a random ZIP code
   */
  static randomZipCode(): string {
    return this.randomString(5, 'numeric');
  }

  /**
   * Generate a random country
   */
  static randomCountry(): string {
    const countries = [
      'USA', 'Canada', 'UK', 'Germany', 'France', 'Spain', 'Italy', 'Japan',
      'China', 'India', 'Australia', 'Brazil', 'Mexico', 'South Korea', 'Netherlands',
    ];
    return this.randomElement(countries);
  }

  /**
   * Generate a random IP address (IPv4)
   */
  static randomIPv4(): string {
    return `${this.randomInt(1, 255)}.${this.randomInt(0, 255)}.${this.randomInt(0, 255)}.${this.randomInt(1, 255)}`;
  }

  /**
   * Generate a random username
   */
  static randomUsername(): string {
    const adjectives = ['cool', 'fast', 'happy', 'smart', 'brave', 'swift', 'bright', 'lucky'];
    const nouns = ['tiger', 'eagle', 'wolf', 'fox', 'bear', 'hawk', 'lion', 'dragon'];
    return `${this.randomElement(adjectives)}_${this.randomElement(nouns)}${this.randomInt(1, 999)}`;
  }

  /**
   * Generate a random password
   */
  static randomPassword(length: number = 12): string {
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    const all = lowercase + uppercase + numbers + symbols;
    let password = '';
    
    // Ensure at least one of each type
    password += lowercase[this.randomInt(0, lowercase.length - 1)];
    password += uppercase[this.randomInt(0, uppercase.length - 1)];
    password += numbers[this.randomInt(0, numbers.length - 1)];
    password += symbols[this.randomInt(0, symbols.length - 1)];
    
    // Fill the rest randomly
    for (let i = password.length; i < length; i++) {
      password += all[this.randomInt(0, all.length - 1)];
    }
    
    // Shuffle the password
    return password.split('').sort(() => 0.5 - Math.random()).join('');
  }

  /**
   * Generate a random URL
   */
  static randomURL(): string {
    const protocols = ['http', 'https'];
    const domains = ['example', 'test', 'demo', 'sample', 'website'];
    const tlds = ['com', 'net', 'org', 'io', 'dev'];
    
    return `${this.randomElement(protocols)}://${this.randomElement(domains)}.${this.randomElement(tlds)}`;
  }

  /**
   * Generate random paragraph text (Lorem Ipsum)
   */
  static randomParagraph(sentences: number = 3): string {
    const words = [
      'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
      'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
      'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
    ];
    
    let paragraph = '';
    for (let i = 0; i < sentences; i++) {
      const sentenceLength = this.randomInt(8, 15);
      const sentence = [];
      
      for (let j = 0; j < sentenceLength; j++) {
        sentence.push(this.randomElement(words));
      }
      
      // Capitalize first letter
      sentence[0] = sentence[0].charAt(0).toUpperCase() + sentence[0].slice(1);
      paragraph += sentence.join(' ') + '. ';
    }
    
    return paragraph.trim();
  }

  /**
   * Generate bulk data using a generator function
   */
  static generateBulkData<T>(count: number, generator: () => T): T[] {
    const data: T[] = [];
    for (let i = 0; i < count; i++) {
      data.push(generator());
    }
    return data;
  }

  /**
   * Generate bulk data with progress callback
   */
  static generateBulkDataWithProgress<T>(
    count: number,
    generator: (index: number) => T,
    progressCallback?: (current: number, total: number, percentage: number) => void
  ): T[] {
    const data: T[] = [];
    const reportInterval = Math.max(1, Math.floor(count / 100)); // Report every 1%
    
    for (let i = 0; i < count; i++) {
      data.push(generator(i));
      
      if (progressCallback && (i % reportInterval === 0 || i === count - 1)) {
        const percentage = ((i + 1) / count) * 100;
        progressCallback(i + 1, count, percentage);
      }
    }
    
    return data;
  }

  /**
   * Generate a random color in hex format
   */
  static randomColor(): string {
    return `#${this.randomString(6, 'hex')}`;
  }

  /**
   * Generate random JSON data
   */
  static randomJSON(depth: number = 2): any {
    if (depth === 0) {
      return this.randomElement([
        this.randomString(10),
        this.randomInt(1, 100),
        this.randomBoolean(),
      ]);
    }

    const obj: any = {};
    const keys = this.randomInt(2, 5);
    
    for (let i = 0; i < keys; i++) {
      const key = this.randomString(this.randomInt(5, 10), 'lowercase');
      obj[key] = this.randomJSON(depth - 1);
    }
    
    return obj;
  }

  /**
   * Generate a random status
   */
  static randomStatus(): string {
    const statuses = ['active', 'inactive', 'pending', 'suspended', 'deleted'];
    return this.randomElement(statuses);
  }

  /**
   * Generate a random price/amount
   */
  static randomPrice(min: number = 10, max: number = 1000): number {
    return this.randomFloat(min, max, 2);
  }

  /**
   * Generate a random company name
   */
  static randomCompanyName(): string {
    const adjectives = ['Global', 'Dynamic', 'Advanced', 'Innovative', 'Premier', 'Elite'];
    const nouns = ['Solutions', 'Systems', 'Technologies', 'Industries', 'Enterprises', 'Group'];
    return `${this.randomElement(adjectives)} ${this.randomElement(nouns)}`;
  }

  /**
   * Generate a random job title
   */
  static randomJobTitle(): string {
    const titles = [
      'Software Engineer', 'Product Manager', 'Data Analyst', 'Designer', 'Marketing Manager',
      'Sales Representative', 'Customer Success Manager', 'DevOps Engineer', 'HR Manager',
      'Financial Analyst', 'Project Manager', 'Business Analyst', 'QA Engineer',
    ];
    return this.randomElement(titles);
  }
}

export default DataGenerator;
