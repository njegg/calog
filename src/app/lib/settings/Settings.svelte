<script lang='ts'>
  import Card from "../common/Card.svelte";
  import { ThemeColors, themeStore } from "../common/theme";
  import { TextField } from "@nativescript/core";
  import { settingsCommands } from "./settings";
  import { fuzzyMatch } from "../search/fuzzyMatch";
  import NavigationBar from "../common/NavigationBar.svelte";
  import { Template } from "svelte-native/components";

  let theme: ThemeColors;
  themeStore.subscribe(t => theme = t);

  $: commandSearchResults = settingsCommands;
  $: searchString = '';
  $: input = '';

  $: textField = <any> new TextField(); // any because the lsp is ass

  function updateSearchResults() {
      if (input == '') {
        commandSearchResults = settingsCommands;
      } else {
        commandSearchResults = settingsCommands.filter(e => fuzzyMatch(searchString, e.name))
      }
  }

  function onTextChange(event: any) {
    searchString = event.value;
    updateSearchResults();
  };

  function execBottomCommand() {
    let visibleCommandCount = commandSearchResults.length;
    if (!visibleCommandCount) return;

    let command = commandSearchResults[visibleCommandCount - 1];
    command.exec();
  }

  function onReturnPress(): void {
    execBottomCommand();

    setTimeout(() => textField.nativeElement.focus(), 0);
  }

  function setInput(to: string) {
      input = to;
      searchString = to;

      textField.nativeView.text = to;
      textField.nativeView.setSelection(to.length);
      setTimeout(() => textField.nativeElement.focus(), 0);

      updateSearchResults();
  }

  function prev(): void {
    setInput("");
  }
</script>

<flexboxLayout
  justifyContent='flex-end'
  flexDirection='column'
>

  <listView
    items={commandSearchResults}
    borderColor='#000'
    separatorColor='rgb(0,0,0,0)'
  >
    <Template let:item>
      <Card padding={5}>
        <label text={item.name} on:tap={item.exec} />
      </Card>
    </Template>
  </listView>


  <NavigationBar
    prev={prev}
    next={execBottomCommand}
  >
    <textField
      bind:this={textField}
      bind:text={input}
      color={theme.text}

      id="search-input"
      flexGrow={1}

      on:textChange={onTextChange}
      on:returnPress={onReturnPress}
      returnKeyType='next'

      editable='true'

      textAlignment='center'
      fontFamily='monospace'
      fontSize='20rem'
      borderWidth='0'
    />
  </NavigationBar>
</flexboxLayout>

<style>
  label {
    flex-grow: 1;
    text-align: center;
  }
</style>
