<script lang='ts'>
  import { onMount } from 'svelte';
  import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
  import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
  import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
  import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
  import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';

  export let language: string;
  export let defaultText: string;

  let editorElement: HTMLDivElement;
  let editor;

  export function getValue() : string {
    return editor.getValue();
  }

  onMount(async () => {
    self.MonacoEnvironment = {
      getWorker: function (_moduleId: any, label: string) {
        if (label === 'json') {
          return new jsonWorker();
        }
        if (label === 'css' || label === 'scss' || label === 'less') {
          return new cssWorker();
        }
        if (label === 'html' || label === 'handlebars' || label === 'razor') {
          return new htmlWorker();
        }
        if (label === 'typescript' || label === 'javascript') {
          return new tsWorker();
        }

        return new editorWorker();
      }
    };

    const monaco = await import('monaco-editor');
    editor = monaco.editor.create(editorElement, {
      value:defaultText ?? '',
      language: language,
      theme: 'vs-dark',
      automaticLayout: true
    });

    return () => {
      editor.dispose();
    };
  });
</script>

<div class='editor-container'>
  <h3>{ language.toUpperCase() }</h3>
  <div bind:this={editorElement} class='editor'/>
</div>

<style>
  .editor-container {
    width: 100%;
    margin-bottom: 1.6rem;
    height: fit-content;
  }

  .editor {
    height: calc(50vh - 6.6rem);
  }
</style>
