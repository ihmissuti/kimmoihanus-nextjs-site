#!/usr/bin/env node
// Test script for geo-tools MCP server
// Run with: node test-tools.js

import { spawn } from 'child_process';
import readline from 'readline';

const server = spawn('node', ['dist/index.js'], {
  cwd: process.cwd(),
  stdio: ['pipe', 'pipe', 'inherit'],
});

let requestId = 0;

function sendRequest(method, params = {}) {
  const id = ++requestId;
  const request = {
    jsonrpc: '2.0',
    id,
    method,
    params,
  };
  console.log(`\n📤 Sending: ${method}`);
  console.log(JSON.stringify(params, null, 2));
  server.stdin.write(JSON.stringify(request) + '\n');
  return id;
}

const rl = readline.createInterface({
  input: server.stdout,
  crlfDelay: Infinity,
});

let responses = [];

rl.on('line', (line) => {
  try {
    const response = JSON.parse(line);
    console.log('\n📥 Response:');
    console.log(JSON.stringify(response, null, 2));
    responses.push(response);

    // Run next test after receiving response
    runNextTest();
  } catch (e) {
    console.log('Raw output:', line);
  }
});

const tests = [
  // Initialize
  () =>
    sendRequest('initialize', {
      protocolVersion: '2024-11-05',
      capabilities: {},
      clientInfo: { name: 'test-client', version: '1.0' },
    }),

  // List tools
  () => sendRequest('tools/list', {}),

  // Test webpage_geo_audit
  () =>
    sendRequest('tools/call', {
      name: 'webpage_geo_audit',
      arguments: { url: 'https://kimmoihanus.com' },
    }),

  // Test generate_schema (organization)
  () =>
    sendRequest('tools/call', {
      name: 'generate_schema',
      arguments: {
        type: 'organization',
        data: {
          name: 'Kimmo Ihanus',
          url: 'https://kimmoihanus.com',
          description: 'AI consultant and developer',
        },
      },
    }),

  // Test agent_friendly_score
  () =>
    sendRequest('tools/call', {
      name: 'agent_friendly_score',
      arguments: {
        tool_name: 'Resend',
        tool_url: 'https://resend.com',
        check_mcp: true,
        check_npm: true,
      },
    }),
];

let currentTest = 0;

function runNextTest() {
  if (currentTest < tests.length) {
    setTimeout(() => {
      tests[currentTest]();
      currentTest++;
    }, 500);
  } else {
    console.log('\n✅ All tests completed!');
    setTimeout(() => {
      server.kill();
      process.exit(0);
    }, 1000);
  }
}

// Start first test
console.log('🚀 Starting geo-tools MCP server tests...\n');
runNextTest();

server.on('close', (code) => {
  console.log(`\nServer exited with code ${code}`);
});
