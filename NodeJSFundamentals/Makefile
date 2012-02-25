# Reporter Types: dot, spec, tap, landing, list, progress, doc, json
REPORTER = spec
UNIT_TESTS = $(shell find test/unit/ -name '*Test.js')
INTEGRATION_TESTS = $(shell find test/integration -name '*Test.js')
ACCEPTANCE_TESTS = $(shell find test/acceptance -name '*Test.js')

test: test-unit

test-all: test-unit test-integration test-acceptance

test-unit:
	@NODE_ENV=development ./node_modules/.bin/mocha \
		--require should \
		--reporter $(REPORTER) \
		--growl \
		$(UNIT_TESTS)

test-integration:
	@NODE_ENV=development ./node_modules/.bin/mocha \
		--require should \
		--reporter $(REPORTER) \
		--growl \
		$(INTEGRATION_TESTS)

test-acceptance:
	@NODE_ENV=test ./node_modules/.bin/mocha \
		--require should \
		--reporter $(REPORTER) \
		--growl \
		$(ACCEPTANCE_TESTS)

