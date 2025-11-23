import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Activity, Archive, BookOpen, Box, ChevronRight, Clock, Code, Database, FileText, GitBranch, Github, Layers, Menu, Moon, Package, Rocket, Search, Settings, Shield, Sun, Terminal, TrendingUp, X, Zap } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const Documentation: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('introduction');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDark);
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode.toString());
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const navigation = [
    {
      title: 'Getting Started',
      items: [
        { id: 'introduction', label: 'Introduction', icon: BookOpen },
        { id: 'installation', label: 'Installation', icon: Package },
        { id: 'quick-start', label: 'Quick Start', icon: Rocket },
        { id: 'configuration', label: 'Configuration', icon: Settings },
      ]
    },
    {
      title: 'Core Concepts',
      items: [
        { id: 'connection', label: 'Connection', icon: Database },
        { id: 'models', label: 'Models', icon: Layers },
        { id: 'query-builder', label: 'Query Builder', icon: Code },
        { id: 'transactions', label: 'Transactions', icon: GitBranch },
      ]
    },
    {
      title: 'Advanced Features',
      items: [
        { id: 'repository', label: 'Repository Pattern', icon: Box },
        { id: 'pagination', label: 'Pagination', icon: FileText },
        { id: 'soft-deletes', label: 'Soft Deletes', icon: Archive },
        { id: 'schema', label: 'Schema Management', icon: Settings },
        { id: 'jobs', label: 'Job Scheduling', icon: Clock },
      ]
    },
    {
      title: 'Utilities',
      items: [
        { id: 'logger', label: 'Query Logger', icon: Terminal },
        { id: 'cache', label: 'Cache Manager', icon: Zap },
        { id: 'performance', label: 'Performance', icon: Activity },
        { id: 'validator', label: 'Validator', icon: Shield },
      ]
    },
  ];

  const content: Record<string, {
    title: string;
    description: string;
    content: React.ReactNode;
  }> = {
    introduction: {
      title: 'Welcome to @cakki/orm',
      description: 'A blazing-fast, type-safe MySQL ORM for TypeScript',
      content: (
        <div className="space-y-8">
          {/* Hero Stats */}
          <div className="grid md:grid-cols-3 gap-4">
            <Card className="border-l-4 border-l-amber-600 dark:border-l-amber-500 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-bold text-amber-900 dark:text-amber-100">13,889</p>
                    <p className="text-sm text-amber-700 dark:text-amber-300">inserts/sec</p>
                  </div>
                  <Zap className="w-10 h-10 text-amber-600 dark:text-amber-400" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-l-4 border-l-emerald-600 dark:border-l-emerald-500 bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-950/20 dark:to-green-950/20">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-bold text-emerald-900 dark:text-emerald-100">0.5ms</p>
                    <p className="text-sm text-emerald-700 dark:text-emerald-300">avg query time</p>
                  </div>
                  <TrendingUp className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-l-4 border-l-amber-700 dark:border-l-amber-600 bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-yellow-950/20">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-bold text-amber-900 dark:text-amber-100">100%</p>
                    <p className="text-sm text-amber-700 dark:text-amber-300">type-safe</p>
                  </div>
                  <Shield className="w-10 h-10 text-amber-700 dark:text-amber-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Why Choose */}
          <Card className="border-2 border-amber-200 dark:border-amber-800">
            <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30">
              <CardTitle className="text-2xl text-amber-900 dark:text-amber-100">Why @cakki/orm?</CardTitle>
              <CardDescription>Built for production workloads with developer experience in mind</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                      <Zap className="w-5 h-5 text-amber-700 dark:text-amber-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Blazing Fast</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Optimized for high-performance with connection pooling and smart caching</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                      <Code className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Type-Safe</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Full TypeScript support with IntelliSense and compile-time safety</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                      <Package className="w-5 h-5 text-amber-700 dark:text-amber-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Zero Dependencies</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Lightweight core with only mysql2 as peer dependency</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                      <Shield className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Production Ready</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Battle-tested with 1M+ records and comprehensive error handling</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                      <Layers className="w-5 h-5 text-amber-700 dark:text-amber-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Flexible Patterns</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Active Record and Repository patterns for any architecture</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                      <GitBranch className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Advanced Features</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Transactions, soft deletes, migrations, and comprehensive utilities</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Key Features */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-amber-900 dark:text-amber-100">Core Features</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-3">
                {[
                  'Active Record and Repository patterns',
                  'Fluent Query Builder with complex joins',
                  'Transaction support with auto-rollback',
                  'Built-in validation and sanitization',
                  'Advanced relationship mapping',
                  'Migration and seeding tools',
                  'Query caching and performance monitoring',
                  'Soft deletes with easy restoration',
                  'Job scheduling with cron syntax',
                  'Comprehensive batch operations',
                  'SQL injection protection',
                  'Connection pool management'
                ].map((feature, index) => (
                  <div key={index} className="flex items-start gap-2 p-3 rounded-lg hover:bg-amber-50 dark:hover:bg-amber-950/20 transition-colors">
                    <ChevronRight className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* CTA */}
          <Alert className="border-2 border-amber-300 dark:border-amber-700 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20">
            <Rocket className="h-5 w-5 text-amber-700 dark:text-amber-400" />
            <AlertDescription className="text-amber-900 dark:text-amber-100">
              <strong>Ready to get started?</strong> Check out the{' '}
              <button 
                onClick={() => setActiveSection('quick-start')} 
                className="font-semibold text-emerald-700 dark:text-emerald-400 hover:underline"
              >
                Quick Start Guide
              </button>
              {' '}to build your first app in 5 minutes!
            </AlertDescription>
          </Alert>
        </div>
      )
    },
    installation: {
      title: 'Installation',
      description: 'Get @cakki/orm up and running in your project',
      content: (
        <div className="space-y-6">
          {/* Prerequisites */}
          <Card className="border-l-4 border-l-amber-600">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-amber-600" />
                Prerequisites
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-amber-50 dark:bg-amber-950/30">Node.js 16+</Badge>
                  <Badge variant="outline" className="bg-emerald-50 dark:bg-emerald-950/30">TypeScript 5.0+</Badge>
                  <Badge variant="outline" className="bg-amber-50 dark:bg-amber-950/30">MySQL 5.7+ / 8.0+</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Package Installation */}
          <Card>
            <CardHeader>
              <CardTitle>Package Installation</CardTitle>
              <CardDescription>Choose your preferred package manager</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="npm" className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-amber-100 dark:bg-amber-900/30">
                  <TabsTrigger value="npm" className="data-[state=active]:bg-amber-600 data-[state=active]:text-white">npm</TabsTrigger>
                  <TabsTrigger value="yarn" className="data-[state=active]:bg-amber-600 data-[state=active]:text-white">yarn</TabsTrigger>
                  <TabsTrigger value="pnpm" className="data-[state=active]:bg-amber-600 data-[state=active]:text-white">pnpm</TabsTrigger>
                </TabsList>
                <TabsContent value="npm">
                  <div className="bg-gray-900 dark:bg-gray-950 text-emerald-400 p-4 rounded-lg font-mono text-sm">
                    npm install @cakki/orm mysql2
                  </div>
                </TabsContent>
                <TabsContent value="yarn">
                  <div className="bg-gray-900 dark:bg-gray-950 text-emerald-400 p-4 rounded-lg font-mono text-sm">
                    yarn add @cakki/orm mysql2
                  </div>
                </TabsContent>
                <TabsContent value="pnpm">
                  <div className="bg-gray-900 dark:bg-gray-950 text-emerald-400 p-4 rounded-lg font-mono text-sm">
                    pnpm add @cakki/orm mysql2
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* TypeScript Config */}
          <Card>
            <CardHeader>
              <CardTitle>TypeScript Configuration</CardTitle>
              <CardDescription>Recommended tsconfig.json settings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-900 dark:bg-gray-950 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <pre>{`{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}`}</pre>
              </div>
            </CardContent>
          </Card>

          {/* Note */}
          <Alert className="border-l-4 border-l-emerald-600 bg-emerald-50 dark:bg-emerald-950/20">
            <AlertDescription className="text-emerald-900 dark:text-emerald-100">
              <strong>Note:</strong> @cakki/orm requires Node.js 16 or higher and TypeScript 5.0 or higher for optimal type safety and features.
            </AlertDescription>
          </Alert>
        </div>
      )
    },
    'quick-start': {
      title: 'Quick Start Guide',
      description: 'Build your first application with @cakki/orm in 5 minutes',
      content: (
        <div className="space-y-6">
          {/* Step 1 */}
          <Card className="border-l-4 border-l-amber-600">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Badge className="bg-amber-600">Step 1</Badge>
                <span>Initialize Database Connection</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-900 dark:bg-gray-950 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <pre>{`import { Connection, Model } from '@cakki/orm';

// Create connection instance
const connection = new Connection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'your_password',
  database: 'myapp',
  connectionLimit: 10,
  waitForConnections: true
});

// Connect to database
await connection.connect();

// Set global connection for models
Model.setConnection(connection);

console.log('✓ Database connected successfully');`}</pre>
              </div>
            </CardContent>
          </Card>

          {/* Step 2 */}
          <Card className="border-l-4 border-l-emerald-600">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Badge className="bg-emerald-600">Step 2</Badge>
                <span>Define Your First Model</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-gray-900 dark:bg-gray-950 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <pre>{`import { Model } from '@cakki/orm';

class User extends Model {
  // Table configuration
  static tableName = 'users';
  static primaryKey = 'id';
  
  // Enable timestamps (created_at, updated_at)
  static timestamps = true;
  
  // Mass assignable attributes
  static fillable = ['name', 'email', 'age', 'role'];
  
  // Hidden from JSON output
  static hidden = ['password', 'token'];
  
  // Type definitions
  id!: number;
  name!: string;
  email!: string;
  age?: number;
  role!: string;
  created_at!: Date;
  updated_at!: Date;
}

export default User;`}</pre>
              </div>
              <Alert className="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800">
                <AlertDescription className="text-amber-900 dark:text-amber-100 text-sm">
                  <strong>Security Tip:</strong> The <code className="text-xs bg-amber-100 dark:bg-amber-900 px-1.5 py-0.5 rounded">fillable</code> property prevents mass assignment vulnerabilities by whitelisting safe attributes.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Step 3 */}
          <Card className="border-l-4 border-l-amber-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Badge className="bg-amber-700">Step 3</Badge>
                <span>Perform CRUD Operations</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="create" className="w-full">
                <TabsList className="grid w-full grid-cols-4 bg-amber-100 dark:bg-amber-900/30">
                  <TabsTrigger value="create" className="data-[state=active]:bg-amber-600 data-[state=active]:text-white">Create</TabsTrigger>
                  <TabsTrigger value="read" className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white">Read</TabsTrigger>
                  <TabsTrigger value="update" className="data-[state=active]:bg-amber-700 data-[state=active]:text-white">Update</TabsTrigger>
                  <TabsTrigger value="delete" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">Delete</TabsTrigger>
                </TabsList>
                
                <TabsContent value="create" className="space-y-3">
                  <div className="bg-gray-900 dark:bg-gray-950 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                    <pre>{`// Create a new user
const user = await User.create({
  name: 'John Doe',
  email: 'john@example.com',
  age: 30,
  role: 'admin'
});

console.log(user.id);         // Auto-generated ID
console.log(user.created_at); // Auto timestamp`}</pre>
                  </div>
                </TabsContent>
                
                <TabsContent value="read" className="space-y-3">
                  <div className="bg-gray-900 dark:bg-gray-950 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                    <pre>{`// Find by ID
const user = await User.find(1);

// Get all users
const users = await User.all();

// Query with conditions
const admins = await User.where('role', 'admin');

// Find first match
const john = await User.query()
  .where('email', '=', 'john@example.com')
  .first();`}</pre>
                  </div>
                </TabsContent>
                
                <TabsContent value="update" className="space-y-3">
                  <div className="bg-gray-900 dark:bg-gray-950 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                    <pre>{`// Update instance
const user = await User.find(1);
user.name = 'Jane Doe';
user.age = 31;
await user.save();

// Update directly with query
await User.query()
  .where('id', '=', 1)
  .update({ name: 'Jane Doe' });

// Bulk update
await User.query()
  .where('role', '=', 'user')
  .update({ active: true });`}</pre>
                  </div>
                </TabsContent>
                
                <TabsContent value="delete" className="space-y-3">
                  <div className="bg-gray-900 dark:bg-gray-950 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                    <pre>{`// Delete instance
const user = await User.find(1);
await user.delete();

// Delete with query
await User.query()
  .where('active', '=', false)
  .delete();

// Delete by ID
await User.destroy(1);`}</pre>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Alert className="border-2 border-emerald-300 dark:border-emerald-700 bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-950/20 dark:to-green-950/20">
            <Rocket className="h-5 w-5 text-emerald-700 dark:text-emerald-400" />
            <AlertDescription className="text-emerald-900 dark:text-emerald-100">
              <strong>Next Steps:</strong> Explore the{' '}
              <button onClick={() => setActiveSection('query-builder')} className="font-semibold text-amber-700 dark:text-amber-400 hover:underline">
                Query Builder
              </button>
              {' '}for advanced queries, or learn about{' '}
              <button onClick={() => setActiveSection('transactions')} className="font-semibold text-amber-700 dark:text-amber-400 hover:underline">
                Transactions
              </button>
              {' '}for data integrity!
            </AlertDescription>
          </Alert>
        </div>
      )
    },
    models: {
      title: 'Models',
      description: 'Active Record pattern for elegant database interactions',
      content: (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-amber-900 dark:text-amber-100">Model Configuration</CardTitle>
              <CardDescription>All available model properties and their usage</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-900 dark:bg-gray-950 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <pre>{`class Product extends Model {
  // Required: Table name
  static tableName = 'products';
  
  // Primary key (default: 'id')
  static primaryKey = 'product_id';
  
  // Enable timestamps (default: false)
  static timestamps = true;
  
  // Mass assignable fields
  static fillable = [
    'name', 'description', 'price', 
    'stock', 'category_id'
  ];
  
  // Hidden from JSON serialization
  static hidden = ['internal_notes'];
  
  // Soft deletes (adds deleted_at column)
  static softDeletes = true;
  
  // Default values
  static defaults = {
    stock: 0,
    active: true
  };
}`}</pre>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-l-4 border-l-amber-600">
              <CardHeader>
                <CardTitle className="text-lg">Instance Methods</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-amber-900 dark:text-amber-100 mb-2">save()</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Persist model changes to database</p>
                  <div className="bg-gray-900 dark:bg-gray-950 text-gray-100 p-3 rounded-lg font-mono text-xs">
                    <pre>{`const product = await Product.find(1);
product.price = 99.99;
await product.save();`}</pre>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-amber-900 dark:text-amber-100 mb-2">delete()</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Remove model from database</p>
                  <div className="bg-gray-900 dark:bg-gray-950 text-gray-100 p-3 rounded-lg font-mono text-xs">
                    <pre>{`await product.delete();
// If soft deletes enabled, sets deleted_at
// Otherwise, removes from database`}</pre>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-amber-900 dark:text-amber-100 mb-2">toJSON()</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Convert to JSON (respects hidden fields)</p>
                  <div className="bg-gray-900 dark:bg-gray-950 text-gray-100 p-3 rounded-lg font-mono text-xs">
                    <pre>{`const json = product.toJSON();
// Hidden fields excluded automatically`}</pre>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-emerald-600">
              <CardHeader>
                <CardTitle className="text-lg">Static Methods</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  {[
                    { method: 'find(id)', desc: 'Find by primary key' },
                    { method: 'all()', desc: 'Get all records' },
                    { method: 'create(data)', desc: 'Create new record' },
                    { method: 'where(field, value)', desc: 'Query with condition' },
                    { method: 'query()', desc: 'Get query builder' },
                    { method: 'destroy(id)', desc: 'Delete by ID' },
                    { method: 'count()', desc: 'Count records' },
                    { method: 'exists(id)', desc: 'Check if exists' }
                  ].map((item, index) => (
                    <div key={index} className="p-3 bg-emerald-50 dark:bg-emerald-950/20 rounded-lg">
                      <code className="text-sm font-semibold text-emerald-900 dark:text-emerald-100">{item.method}</code>
                      <p className="text-xs text-emerald-700 dark:text-emerald-300 mt-1">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )
    },
    'query-builder': {
      title: 'Query Builder',
      description: 'Fluent interface for building complex SQL queries',
      content: (
        <div className="space-y-6">
          <Card className="border-l-4 border-l-amber-600">
            <CardHeader>
              <CardTitle>Basic Queries</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-900 dark:bg-gray-950 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <pre>{`// Simple query
const users = await User.query()
  .where('age', '>', 18)
  .get();

// Complex query with joins
const results = await User.query()
  .select('users.*', 'posts.title')
  .leftJoin('posts', 'users.id', '=', 'posts.user_id')
  .where('users.active', '=', true)
  .orderBy('users.created_at', 'DESC')
  .limit(10)
  .get();`}</pre>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-l-4 border-l-emerald-600">
              <CardHeader>
                <CardTitle className="text-lg">WHERE Clauses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-900 dark:bg-gray-950 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                  <pre>{`// Multiple conditions
User.query()
  .where('age', '>', 18)
  .where('status', '=', 'active')
  .orWhere('role', '=', 'admin')

// IN clause
User.query()
  .whereIn('id', [1, 2, 3, 4, 5])

// NULL checks
User.query()
  .whereNull('deleted_at')
  .whereNotNull('email_verified_at')`}</pre>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-amber-700">
              <CardHeader>
                <CardTitle className="text-lg">Aggregations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-900 dark:bg-gray-950 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                  <pre>{`// Count records
const count = await User.query()
  .count();

// Sum, Average, Min, Max
const sum = await Order.query()
  .sum('amount');
  
const avg = await User.query()
  .avg('age');
  
const min = await Product.query()
  .min('price');
  
const max = await Product.query()
  .max('price');`}</pre>
                </div>
              </CardContent>
            </Card>
          </div>

          <Alert className="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800">
            <Zap className="h-4 w-4 text-amber-700 dark:text-amber-400" />
            <AlertDescription className="text-amber-900 dark:text-amber-100">
              <strong>Performance Tip:</strong> Always use <code className="text-xs bg-amber-100 dark:bg-amber-900 px-1.5 py-0.5 rounded">select()</code> to specify needed columns instead of fetching all with <code className="text-xs bg-amber-100 dark:bg-amber-900 px-1.5 py-0.5 rounded">SELECT *</code>
            </AlertDescription>
          </Alert>
        </div>
      )
    },
    transactions: {
      title: 'Transactions',
      description: 'Ensure data integrity with atomic operations',
      content: (
        <div className="space-y-6">
          <Card className="border-l-4 border-l-amber-600">
            <CardHeader>
              <CardTitle>Basic Transaction Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-900 dark:bg-gray-950 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <pre>{`import { Transaction } from '@cakki/orm';

// Automatic transaction management
await Transaction.run(connection, async (trx) => {
  // All queries use same transaction
  
  await trx.execute(
    'UPDATE accounts SET balance = balance - ? WHERE id = ?',
    [100, 1]
  );
  
  await trx.execute(
    'UPDATE accounts SET balance = balance + ? WHERE id = ?',
    [100, 2]
  );
  
  // Auto-commits on success
  // Auto-rolls back on error
});`}</pre>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-emerald-600">
            <CardHeader>
              <CardTitle>Error Handling</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-900 dark:bg-gray-950 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <pre>{`try {
  await Transaction.run(connection, async (trx) => {
    await trx.execute(
      'UPDATE accounts SET balance = balance - 100 WHERE id = 1'
    );
    
    // This will throw an error
    if (insufficientBalance) {
      throw new Error('Insufficient balance');
    }
    
    // This won't execute if error thrown
    await trx.execute(
      'UPDATE accounts SET balance = balance + 100 WHERE id = 2'
    );
  });
} catch (error) {
  console.error('Transaction failed:', error);
  // All changes automatically rolled back
}`}</pre>
              </div>
            </CardContent>
          </Card>

          <Alert className="bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800">
            <Shield className="h-4 w-4 text-emerald-700 dark:text-emerald-400" />
            <AlertDescription className="text-emerald-900 dark:text-emerald-100">
              <strong>Best Practice:</strong> Keep transactions short and only include database operations. Prepare data and make API calls before starting the transaction.
            </AlertDescription>
          </Alert>
        </div>
      )
    },
    repository: {
      title: 'Repository Pattern',
      description: 'Clean separation of data access logic',
      content: (
        <div className="space-y-6">
          <Card className="border-l-4 border-l-amber-600">
            <CardHeader>
              <CardTitle>Creating a Repository</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-900 dark:bg-gray-950 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <pre>{`import { Repository } from '@cakki/orm';

class UserRepository extends Repository<User> {
  constructor() {
    super(User);
  }

  // Custom methods
  async findByEmail(email: string) {
    return await this.query()
      .where('email', '=', email)
      .first();
  }

  async getActiveUsers() {
    return await this.query()
      .where('active', '=', true)
      .orderBy('last_login', 'DESC')
      .get();
  }

  async getTopContributors(limit = 10) {
    return await this.query()
      .select('users.*', 'COUNT(posts.id) as post_count')
      .leftJoin('posts', 'users.id', '=', 'posts.user_id')
      .groupBy('users.id')
      .orderBy('post_count', 'DESC')
      .limit(limit)
      .get();
  }
}`}</pre>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-emerald-600">
            <CardHeader>
              <CardTitle>Using Repositories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-900 dark:bg-gray-950 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <pre>{`const userRepo = new UserRepository();

// Basic CRUD operations
const user = await userRepo.create({
  email: 'john@example.com',
  name: 'John Doe',
  age: 30
});

const found = await userRepo.find(user.id);
await userRepo.update(user.id, { name: 'Jane Doe' });
await userRepo.delete(user.id);

// Custom methods
const john = await userRepo.findByEmail('john@example.com');
const activeUsers = await userRepo.getActiveUsers();
const topUsers = await userRepo.getTopContributors(10);`}</pre>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    },
    pagination: {
      title: 'Pagination',
      description: 'Multiple pagination strategies for different use cases',
      content: (
        <div className="space-y-6">
          <div className="grid md:grid-cols-3 gap-4">
            <Card className="border-t-4 border-t-amber-600">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-amber-900 dark:text-amber-100 mb-2">Standard</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Full page info with total count</p>
              </CardContent>
            </Card>
            <Card className="border-t-4 border-t-emerald-600">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-emerald-900 dark:text-emerald-100 mb-2">Simple</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Fast without count query</p>
              </CardContent>
            </Card>
            <Card className="border-t-4 border-t-amber-700">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-amber-900 dark:text-amber-100 mb-2">Cursor</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Ideal for infinite scroll</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Standard Pagination</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-900 dark:bg-gray-950 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <pre>{`import { Paginator } from '@cakki/orm';

const paginator = new Paginator(User.query());
const result = await paginator.paginate(1, 20);

console.log(result.data);          // Records
console.log(result.total);         // Total count
console.log(result.currentPage);   // Current page
console.log(result.lastPage);      // Last page
console.log(result.hasMorePages);  // Boolean`}</pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Cursor Pagination</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-900 dark:bg-gray-950 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <pre>{`// Perfect for infinite scroll
const result = await paginator.cursorPaginate(
  null,  // cursor (null for first page)
  20,    // perPage
  'id'   // cursorColumn
);

console.log(result.nextCursor);    // Next cursor
console.log(result.hasMore);       // Has more pages

// Next page
const next = await paginator.cursorPaginate(
  result.nextCursor,
  20,
  'id'
);`}</pre>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    },
    'soft-deletes': {
      title: 'Soft Deletes',
      description: 'Delete records without actually removing them',
      content: (
        <div className="space-y-6">
          <Card className="border-l-4 border-l-amber-600">
            <CardHeader>
              <CardTitle>Defining Soft Delete Model</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-900 dark:bg-gray-950 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <pre>{`import { SoftDeleteModel } from '@cakki/orm';

class Post extends SoftDeleteModel {
  static tableName = 'posts';
  static primaryKey = 'id';
  static timestamps = true;
  static fillable = ['title', 'content', 'user_id'];
  
  // Optional: customize column name
  static deletedAtColumn = 'deleted_at';
}`}</pre>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-emerald-600">
            <CardHeader>
              <CardTitle>Basic Operations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-900 dark:bg-gray-950 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <pre>{`const post = await Post.create({
  title: 'My Post',
  content: 'Post content',
  user_id: 1
});

// Soft delete (sets deleted_at)
await post.delete();

// Check if trashed
console.log(post.isTrashed()); // true

// Restore post
await post.restore();
console.log(post.isTrashed()); // false

// Permanently delete
await post.forceDelete();`}</pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Querying Soft Deleted Records</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-900 dark:bg-gray-950 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <pre>{`// Default: excludes soft deleted
const posts = await Post.all();

// Include soft deleted
const allPosts = await Post.allWithTrashed();

// Only soft deleted
const trashedPosts = await Post.onlyTrashed();

// Restore all trashed
await Post.restoreAll();`}</pre>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    },
    logger: {
      title: 'Query Logger',
      description: 'Track and analyze all SQL queries',
      content: (
        <div className="space-y-6">
          <Card className="border-l-4 border-l-amber-600">
            <CardHeader>
              <CardTitle>Enable Logging</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-900 dark:bg-gray-950 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <pre>{`import { QueryLogger } from '@cakki/orm';

// Enable logging
QueryLogger.enable();

// Set max logs to keep
QueryLogger.setMaxLogs(500);

// Your queries are now logged
const users = await User.all();

// Get all logs
const logs = QueryLogger.getLogs();

for (const log of logs) {
  console.log('SQL:', log.sql);
  console.log('Duration:', log.duration, 'ms');
  console.log('Success:', log.success);
}`}</pre>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-emerald-600">
            <CardHeader>
              <CardTitle>Query Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-900 dark:bg-gray-950 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <pre>{`const stats = QueryLogger.getStats();

console.log('Total Queries:', stats.totalQueries);
console.log('Successful:', stats.successfulQueries);
console.log('Failed:', stats.failedQueries);
console.log('Average Duration:', stats.averageDuration, 'ms');
console.log('Slowest Query:', stats.slowestQuery);

// Get slow queries (over 1 second)
const slowQueries = QueryLogger.getSlowQueries(1000);

// Get failed queries
const failedQueries = QueryLogger.getFailedQueries();`}</pre>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    },
    cache: {
      title: 'Cache Manager',
      description: 'In-memory caching with TTL support',
      content: (
        <div className="space-y-6">
          <Card className="border-l-4 border-l-amber-600">
            <CardHeader>
              <CardTitle>Basic Caching</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-900 dark:bg-gray-950 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <pre>{`import { CacheManager } from '@cakki/orm';

const cache = new CacheManager({ 
  ttl: 3600,          // Default TTL: 1 hour
  prefix: 'myapp:'    // Key prefix
});

// Set value
cache.set('user:1', { id: 1, name: 'John' });

// Set with custom TTL (5 minutes)
cache.set('user:2', { id: 2, name: 'Jane' }, 300);

// Get value
const user = cache.get('user:1');

// Check if exists
if (cache.has('user:1')) {
  console.log('Key exists');
}

// Delete key
cache.delete('user:1');

// Clear all
cache.clear();`}</pre>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-emerald-600">
            <CardHeader>
              <CardTitle>Remember Pattern</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-900 dark:bg-gray-950 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <pre>{`// Get from cache or execute callback
const posts = await cache.remember(
  'posts:latest',
  async () => {
    // Only executed on cache miss
    return await Post.query()
      .where('published', '=', true)
      .orderBy('created_at', 'DESC')
      .limit(10)
      .get();
  },
  600 // TTL: 600 seconds
);

// Remember forever (no expiration)
const settings = await cache.rememberForever(
  'app:settings',
  async () => {
    return await Settings.all();
  }
);`}</pre>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    },
    performance: {
      title: 'Performance Monitor',
      description: 'Track and optimize application performance',
      content: (
        <div className="space-y-6">
          {/* Performance Stats */}
          <div className="grid md:grid-cols-4 gap-4">
            <Card className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20">
              <CardContent className="pt-6">
                <p className="text-2xl font-bold text-amber-900 dark:text-amber-100">13,889</p>
                <p className="text-sm text-amber-700 dark:text-amber-300">inserts/sec</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-950/20 dark:to-green-950/20">
              <CardContent className="pt-6">
                <p className="text-2xl font-bold text-emerald-900 dark:text-emerald-100">0.5ms</p>
                <p className="text-sm text-emerald-700 dark:text-emerald-300">avg query</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-yellow-950/20">
              <CardContent className="pt-6">
                <p className="text-2xl font-bold text-amber-900 dark:text-amber-100">208x</p>
                <p className="text-sm text-amber-700 dark:text-amber-300">with indexes</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20">
              <CardContent className="pt-6">
                <p className="text-2xl font-bold text-emerald-900 dark:text-emerald-100">1M+</p>
                <p className="text-sm text-emerald-700 dark:text-emerald-300">records tested</p>
              </CardContent>
            </Card>
          </div>

          <Card className="border-l-4 border-l-amber-600">
            <CardHeader>
              <CardTitle>Performance Monitoring</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-900 dark:bg-gray-950 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <pre>{`import { PerformanceMonitor } from '@cakki/orm';

const monitor = new PerformanceMonitor();

// Measure async operation
await monitor.measure('fetch-users', async () => {
  return await User.query().limit(100).get();
});

// Get statistics
const stats = monitor.getStats('fetch-users');

console.log('Count:', stats.count);
console.log('Average:', stats.averageDuration, 'ms');
console.log('Min:', stats.minDuration, 'ms');
console.log('Max:', stats.maxDuration, 'ms');
console.log('P95:', stats.p95, 'ms');
console.log('P99:', stats.p99, 'ms');

// Get slowest operations
const slowest = monitor.getSlowestOperations(10);`}</pre>
              </div>
            </CardContent>
          </Card>

          <Alert className="bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800">
            <Activity className="h-4 w-4 text-emerald-700 dark:text-emerald-400" />
            <AlertDescription className="text-emerald-900 dark:text-emerald-100">
              <strong>Benchmark Results:</strong> Tested with 1M+ records. Index usage provides 23-208x performance improvement. Always use proper indexing!
            </AlertDescription>
          </Alert>
        </div>
      )
    },
    validator: {
      title: 'Validator',
      description: 'Comprehensive data validation utilities',
      content: (
        <div className="space-y-6">
          <Card className="border-l-4 border-l-amber-600">
            <CardHeader>
              <CardTitle>Basic Validation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-900 dark:bg-gray-950 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <pre>{`import { Validator } from '@cakki/orm';

const validator = new Validator();

// Required field
validator.required('email', 'john@example.com');

// Email validation
validator.email('email', 'john@example.com');

// Numeric validation
validator.numeric('age', 25);
validator.min('age', 18, 18);
validator.max('age', 65, 65);

// String validation
validator.minLength('password', 'secret123', 8);
validator.pattern('zipCode', '12345', /^\\d{5}$/);`}</pre>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-emerald-600">
            <CardHeader>
              <CardTitle>Batch Validation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-900 dark:bg-gray-950 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <pre>{`const data = {
  name: 'John Doe',
  email: 'invalid-email',
  age: 15,
  password: '123'
};

const validator = Validator.make(data, {
  name: 'required|minLength:3',
  email: 'required|email',
  age: 'required|numeric|min:18',
  password: 'required|minLength:8'
});

if (validator.fails()) {
  const errors = validator.getErrors();
  console.log(errors);
  // {
  //   email: ['must be valid email'],
  //   age: ['must be at least 18'],
  //   password: ['must be at least 8 characters']
  // }
}

if (validator.passes()) {
  console.log('All validations passed!');
}`}</pre>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    }
  };

  const currentContent = content[activeSection] || content.introduction;

  return (
    <div className={`min-h-screen transition-colors duration-200 ${darkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-amber-950/20 dark:to-gray-950">
        {/* Header */}
        <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-amber-200 dark:border-amber-900/50 shadow-lg sticky top-0 z-50 transition-colors duration-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-600 to-orange-600 rounded-xl blur opacity-75"></div>
                  <div className="relative flex items-center justify-center w-12 h-12 bg-gradient-to-br from-amber-600 via-amber-700 to-amber-800 rounded-xl shadow-lg">
                    <Database className="w-7 h-7 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-amber-700 via-amber-800 to-amber-900 dark:from-amber-400 dark:via-amber-500 dark:to-amber-600 bg-clip-text text-transparent">
                    @cakki/orm
                  </h1>
                  <div className="flex items-center gap-2">
                    <Badge className="text-xs bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300">v1.0.0</Badge>
                    <Badge className="text-xs bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">MySQL</Badge>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <button className="hidden md:flex items-center gap-2 px-4 py-2 border border-amber-300 dark:border-amber-700 rounded-lg hover:bg-amber-50 dark:hover:bg-amber-900/30 transition-colors">
                  <Search className="w-4 h-4 text-amber-700 dark:text-amber-400" />
                  <span className="text-sm text-amber-800 dark:text-amber-300">Search...</span>
                  <kbd className="px-2 py-0.5 text-xs bg-amber-100 dark:bg-amber-900/50 border border-amber-300 dark:border-amber-700 rounded">⌘K</kbd>
                </button>
                
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="p-2 text-amber-700 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-900/30 rounded-lg transition-colors"
                  aria-label="Toggle dark mode"
                >
                  {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
                
                <a 
                  href="https://github.com/yourusername/cakki-orm" 
                  className="p-2 text-amber-700 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-900/30 rounded-lg transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="w-5 h-5" />
                </a>
                
                <button 
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="lg:hidden p-2 text-amber-700 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-900/30 rounded-lg transition-colors"
                >
                  {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex gap-8">
            {/* Sidebar */}
            <aside className={`
              ${sidebarOpen ? 'block' : 'hidden'} lg:block
              w-64 flex-shrink-0
              fixed lg:sticky top-20 left-0 h-[calc(100vh-5rem)]
              bg-white/90 dark:bg-gray-900/90 lg:bg-transparent dark:lg:bg-transparent
              backdrop-blur-md lg:backdrop-blur-none
              z-40 lg:z-0
              overflow-y-auto
              border-r border-amber-200 dark:border-amber-900/50 lg:border-0
              p-4 lg:p-0
              shadow-2xl lg:shadow-none
              transition-colors duration-200
            `}>
              <nav className="space-y-6">
                {navigation.map((section) => (
                  <div key={section.title}>
                    <h3 className="text-xs font-semibold text-amber-800 dark:text-amber-400 uppercase tracking-wider mb-3 px-3">
                      {section.title}
                    </h3>
                    <ul className="space-y-1">
                      {section.items.map((item) => {
                        const Icon = item.icon;
                        return (
                          <li key={item.id}>
                            <button
                              onClick={() => {
                                setActiveSection(item.id);
                                setSidebarOpen(false);
                              }}
                              className={`
                                w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm
                                transition-all duration-200
                                ${activeSection === item.id
                                  ? 'bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/50 dark:to-orange-900/50 text-amber-900 dark:text-amber-100 font-semibold shadow-md border-l-4 border-l-emerald-600'
                                  : 'text-gray-700 dark:text-gray-300 hover:bg-amber-50 dark:hover:bg-amber-900/20 hover:text-amber-900 dark:hover:text-amber-100'
                                }
                              `}
                            >
                              <Icon className="w-4 h-4" />
                              {item.label}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </nav>
              
              {/* Sidebar Footer */}
              <div className="mt-8 p-4 bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 rounded-lg border border-amber-300 dark:border-amber-800">
                <h4 className="font-semibold text-amber-900 dark:text-amber-100 mb-2 flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  Quick Links
                </h4>
                <div className="space-y-2 text-sm">
                  <a href="#" className="block text-amber-700 dark:text-amber-300 hover:text-amber-900 dark:hover:text-amber-100">
                    GitHub Repository
                  </a>
                  <a href="#" className="block text-amber-700 dark:text-amber-300 hover:text-amber-900 dark:hover:text-amber-100">
                    NPM Package
                  </a>
                  <a href="#" className="block text-amber-700 dark:text-amber-300 hover:text-amber-900 dark:hover:text-amber-100">
                    Changelog
                  </a>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 min-w-0">
              <Card className="shadow-xl border-2 border-amber-200 dark:border-amber-900/50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
                <CardHeader className="border-b-2 border-amber-100 dark:border-amber-900/30 bg-gradient-to-r from-amber-50/50 to-orange-50/50 dark:from-amber-950/20 dark:to-orange-950/20">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-3xl text-amber-900 dark:text-amber-100 mb-2">
                        {currentContent.title}
                      </CardTitle>
                      <CardDescription className="text-lg text-amber-700 dark:text-amber-300">
                        {currentContent.description}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300">
                        <Activity className="w-3 h-3 mr-1" />
                        Active
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  {currentContent.content}
                </CardContent>
              </Card>

              {/* Navigation Footer */}
              <div className="mt-6 flex justify-between items-center p-4 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm rounded-lg border border-amber-200 dark:border-amber-900/50">
                <button className="flex items-center gap-2 text-sm text-amber-700 dark:text-amber-300 hover:text-amber-900 dark:hover:text-amber-100 font-medium transition-colors">
                  <ChevronRight className="w-4 h-4 rotate-180" />
                  Previous
                </button>
                <button className="flex items-center gap-2 text-sm text-amber-700 dark:text-amber-300 hover:text-amber-900 dark:hover:text-amber-100 font-medium transition-colors">
                  Next
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Footer */}
              <footer className="mt-8 text-center">
                <div className="p-6 bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-950/30 dark:to-orange-950/30 rounded-lg border-2 border-amber-200 dark:border-amber-900/50">
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-amber-600 to-amber-800 rounded-lg">
                      <Database className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-bold text-amber-900 dark:text-amber-100">@cakki/orm</span>
                  </div>
                  <p className="text-sm text-amber-800 dark:text-amber-300 mb-1">
                    Built with React, TypeScript, and shadcn/ui
                  </p>
                  <p className="text-xs text-amber-700 dark:text-amber-400">
                    MIT License • © 2024 @cakki/orm • Made with 🤎 and ☕
                  </p>
                  <div className="mt-4 flex items-center justify-center gap-4 text-xs text-amber-700 dark:text-amber-400">
                    <a href="#" className="hover:text-amber-900 dark:hover:text-amber-100 transition-colors">Privacy</a>
                    <span>•</span>
                    <a href="#" className="hover:text-amber-900 dark:hover:text-amber-100 transition-colors">Terms</a>
                    <span>•</span>
                    <a href="#" className="hover:text-amber-900 dark:hover:text-amber-100 transition-colors">Community</a>
                  </div>
                </div>
              </footer>
            </main>
          </div>
        </div>

        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 dark:bg-black/70 z-30 lg:hidden backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Documentation;
