#!/usr/bin/env node
// Test geo_recommendations tool
import { spawn } from 'child_process';
import readline from 'readline';

const server = spawn('node', ['dist/index.js'], {
  cwd: process.cwd(),
  stdio: ['pipe', 'pipe', 'inherit'],
});

let requestId = 0;

function sendRequest(method, params = {}) {
  const id = ++requestId;
  const request = { jsonrpc: '2.0', id, method, params };
  console.log(`\n📤 Sending: ${method}`);
  server.stdin.write(JSON.stringify(request) + '\n');
  return id;
}

const rl = readline.createInterface({ input: server.stdout, crlfDelay: Infinity });

let initialized = false;

rl.on('line', (line) => {
  try {
    const response = JSON.parse(line);
    if (response.id === 1) {
      // After init, call geo_recommendations
      initialized = true;
      sendRequest('tools/call', {
        name: 'geo_recommendations',
        arguments: {
          audit_results: {
            score: 40,
            analysis: {
              hasSchema: false,
              hasOrganizationSchema: false,
              hasFAQSchema: false,
              hasH1: true,
              hasProperHeadingHierarchy: true,
              hasMetaDescription: true,
              hasCodeBlocks: false,
              url: 'https://example.com/docs',
            },
          },
        },
      });
    } else if (response.id === 2) {
      console.log('\n📥 geo_recommendations Response:');
      console.log(JSON.stringify(JSON.parse(response.result.content[0].text), null, 2));
      setTimeout(() => {
        server.kill();
        process.exit(0);
      }, 500);
    }
  } catch (e) {
    console.log('Raw:', line);
  }
});

console.log('🚀 Testing geo_recommendations...\n');
sendRequest('initialize', {
  protocolVersion: '2024-11-05',
  capabilities: {},
  clientInfo: { name: 'test-client', version: '1.0' },
});
